import {mkdirSync,writeFileSync,existsSync,realpathSync,readFileSync} from "node:fs";
import {resolve,join} from "node:path";
import {fileURLToPath} from "node:url";

import {plan} from "./engine.mjs";

const endpoint="https://systra.tools/api/mcp";
const validName=x=>typeof x==="string"&&/^[A-Za-z][A-Za-z0-9_-]{0,119}$/.test(x);
export function parseMatches(t){
 const lines=t.split(/\r?\n/),hits=[];
 for(const line of lines){
  const m=line.match(/^- ([A-Za-z][A-Za-z0-9_-]*) \(([a-zA-Z0-9_-]+)(?:, (free))?\)(?:: (.*))?$/);
  if(m&&!hits.some(x=>x.name===m[1]))hits.push({name:m[1],category:m[2],access:m[3]?"free":"premium-or-unknown",description:m[4]??""});
 }
 if(!hits.length&&!/^No matches|^Keine Treffer/i.test(t))throw Error("Unrecognized search response; inspect manually.");
 return hits;
}
export function parseSource(t,name){
 const m=t.match(/^([A-Za-z][A-Za-z0-9_-]*) \((?:category|Kategorie): ([a-zA-Z0-9_-]+)\)\s*\r?\n\x60\x60\x60(?:tsx|jsx)\r?\n([\s\S]+?)\r?\n\x60\x60\x60(?:\r?\n|$)/);
 if(!m||m[1]!==name)throw Error("No verified source for requested component.");
 const source=m[3],notes=t.slice(m[0].length).trim();
 const imports=[...source.matchAll(/\bfrom\s*["']([^"']+)["']/g)].map(x=>x[1]);
 const iconSystems=[...new Set(imports.filter(x=>/lucide|hugeicons|heroicons|react-icons/i.test(x)))];
 return {name,category:m[2],source,notes,iconSystems,needsIconReview:iconSystems.some(x=>!/hugeicons/i.test(x)),imports:[...new Set(imports)]};
}
export function createClient({fetcher=globalThis.fetch,key=process.env.SYSTRA_MCP_KEY||""}={}){
 let id=0,session,protocol="2025-03-26",initialized=false;
 async function rpc(method,params={},notify=false){
  const headers={"Content-Type":"application/json",Accept:"application/json, text/event-stream"};
  if(key)headers.Authorization="Bearer "+key;
  if(session)headers["Mcp-Session-Id"]=session;
  if(initialized)headers["MCP-Protocol-Version"]=protocol;
  const rid=++id,payload={jsonrpc:"2.0",method,params,...(notify?{}:{id:rid})};
  const response=await fetcher(endpoint,{method:"POST",headers,body:JSON.stringify(payload),redirect:"error",signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error("Systra MCP HTTP "+response.status+(response.status===429?" (rate limited; retry later)":""));
  if(response.headers.get("mcp-session-id"))session=response.headers.get("mcp-session-id");
  if(notify)return;
  const raw=await response.text();
  let result;
  if((response.headers.get("content-type")??"").includes("text/event-stream")){
   for(const block of raw.split(/\r?\n\r?\n/)){
    const data=block.split(/\r?\n/).filter(l=>l.startsWith("data:")).map(l=>l.slice(5).trim()).join("\n");
    if(data){const o=JSON.parse(data);if(o.id===rid){result=o;break;}}
   }
  }else result=JSON.parse(raw);
  if(!result||result.jsonrpc!=="2.0"||result.id!==rid||result.error||!result.result)throw Error("Invalid or failed MCP response.");
  return result.result;
 }
 async function init(){
  if(initialized)return;
  const result=await rpc("initialize",{protocolVersion:protocol,capabilities:{},clientInfo:{name:"systra-taste-engine",version:"3.1.0"}});
  if(result.serverInfo?.name!=="systra-tools"||!result.capabilities?.tools)throw Error("Unexpected MCP server.");
  protocol=result.protocolVersion;initialized=true;
  await rpc("notifications/initialized",{},true);
 }
 async function tool(name,args){
  await init();const result=await rpc("tools/call",{name,arguments:args});
  const t=(result.content??[]).filter(x=>x.type==="text").map(x=>x.text).join("\n");
  if(result.isError)throw Error(/^🔒|requires an active Premium|Teil von Premium/i.test(t)?"Access denied: active Premium entitlement required.":"MCP tool failed; inspect the server response in an authorized client.");
  return t;
 }
 return {
  async search(query,{category,freeOnly=!key}={}){
   if(typeof query!=="string"||!query.trim()||query.length>200)throw Error("Supply a search query of 1–200 characters.");
   const hits=parseMatches(await tool("search_components",{query:query.trim()}));
   const candidates=hits.filter(x=>(!category||x.category===category)&&(!freeOnly||x.access==="free"));
   return {query,candidates:candidates.slice(0,8),visibleMatches:hits.length,mode:freeOnly?"free-only":"include-premium-candidates",status:candidates.length?"candidates":"no-match",note:"Server ranking, not verified design quality or entitlement. Choose after inspecting the returned candidates."};
  },
  async source(candidate){
   if(!candidate||!validName(candidate.name))throw Error("Choose a component returned by search.");
   if(!key&&candidate.access!=="free")throw Error("No authorized Premium key; choose a free component.");
   return parseSource(await tool("get_component",{name:candidate.name}),candidate.name);
  }
 };
}
export async function lookupBrief(client,brief){
 const local=plan(brief);
 if(local.status==="no-match")return {status:"no-match",note:"No supported offline job. Use an explicit remote search query.",local};
 const category={hero:"heroes",pricing:"pricing",comparison:"comparison"}[local.job];
 const remote=await client.search(local.mcp.query,{category});
 return {localJob:local.job,localStatus:local.status,query:local.mcp.query,remote,offlineFallback:local.component};
}
export async function exportSelected(client,query,name,dest,options={}){
 if(!validName(name))throw Error("Invalid component name.");
 const target=resolve(dest);
 if(existsSync(target))throw Error("Destination already exists.");
 const result=await client.search(query,options);
 const candidate=result.candidates.find(c=>c.name===name);
 if(!candidate)throw Error("Name not among eligible search candidates. Narrow the query.");
 const data=await client.source(candidate);
 mkdirSync(target,{recursive:false});
 // Save exact returned source and integration notes. Never execute code, install packages, download assets or publish.
 writeFileSync(join(target,data.name+".tsx"),data.source+"\n");
 writeFileSync(join(target,"integration.md"),data.notes+"\n");
 const plan={source:"systra-mcp",name:data.name,category:data.category,access:candidate.access,imports:data.imports,iconSystems:data.iconSystems,needsIconReview:data.needsIconReview,status:"source-retrieved-not-rendered",review:["Inspect source and real preview","Apply Hugeicons where project requires; do not silently substitute icon libraries","Review listed dependencies and local assets","Build and verify interaction, responsive layout and motion"],redistribution:"Do not publish fetched source as part of this skill."};
 writeFileSync(join(target,"plan.json"),JSON.stringify(plan,null,2)+"\n");
 return plan;
}
if(process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url))){
 try{
 const [action,query,name,dest]=process.argv.slice(2),client=createClient();
 if(action==="search"&&query)console.log(JSON.stringify(await client.search(query),null,2));
 else if(action==="lookup"&&query)console.log(JSON.stringify(await lookupBrief(client,JSON.parse(readFileSync(query,"utf8"))),null,2));
 else if(action==="source"&&query&&name&&dest)console.log(JSON.stringify(await exportSelected(client,query,name,dest),null,2));
 else throw Error("Usage: node mcp.mjs search QUERY | lookup BRIEF.json | source QUERY NAME NEW_DIRECTORY");
 }catch(e){console.error(e.message);process.exitCode=1;}
}
