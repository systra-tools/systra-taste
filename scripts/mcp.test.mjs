import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,readFileSync,rmSync,existsSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {parseMatches,parseSource,createClient,exportSelected,lookupBrief} from "../skills/systra-taste/engine/mcp.mjs";
const search='Matches for "hero" (2, best first):\n- FreeHero (heroes, free): Example\n- LockedHero (heroes): Example\n\n"free": full source without a key.';
const code='FreeHero (category: heroes)\n\n```tsx\nimport {ArrowRight} from "lucide-react";\nexport function FreeHero(){return null;}\n```\n\n## Dependencies\nReview before installing.';
function mock({deny=false,sse=false}={}){
 const calls=[];
 const fetcher=async(url,opts)=>{
  assert.equal(url,"https://systra.tools/api/mcp");
  const q=JSON.parse(opts.body);calls.push(q);
  if(q.method==="notifications/initialized")return new Response(null,{status:202});
  let result=q.method==="initialize"?{serverInfo:{name:"systra-tools"},protocolVersion:"2025-03-26",capabilities:{tools:{}}}:{content:[{type:"text",text:q.params.name==="search_components"?search:deny?"🔒 The complete source requires an active Premium account.":code}],isError:deny&&q.params.name==="get_component"};
  const payload=JSON.stringify({jsonrpc:"2.0",id:q.id,result});
  return new Response(sse?"event: message\ndata: "+payload+"\n\n":payload,{headers:{"content-type":sse?"text/event-stream":"application/json"}});
 };
 return {fetcher,calls};
}
test("parses actual search format, access and no results",()=>{
 const hits=parseMatches(search);assert.equal(hits.length,2);assert.equal(hits[0].access,"free");assert.equal(hits[1].access,"premium-or-unknown");assert.deepEqual(parseMatches('No matches for "x".'),[]);assert.throws(()=>parseMatches("unexpected format"));
});
test("source preserves notes and flags Lucide",()=>{
 const p=parseSource(code,"FreeHero");assert.match(p.source,/export function/);assert.match(p.notes,/Dependencies/);assert.equal(p.needsIconReview,true);assert.throws(()=>parseSource(code,"LockedHero"));assert.throws(()=>parseSource("🔒 locked","FreeHero"));
});
test("free default never fetches locked source",async()=>{
 const {fetcher,calls}=mock();const c=createClient({fetcher,key:""});const r=await c.search("hero");assert.deepEqual(r.candidates.map(x=>x.name),["FreeHero"]);await assert.rejects(()=>c.source({name:"LockedHero",access:"premium-or-unknown"}),/No authorized/);assert.equal(calls.filter(x=>x.params?.name==="get_component").length,0);
});
test("export retains source, never overwrites and only accepts listed candidates",async()=>{
 const {fetcher}=mock({sse:true});const c=createClient({fetcher,key:""});const dir=mkdtempSync(join(tmpdir(),"taste-mcp-"));try{
 const dest=join(dir,"section");const p=await exportSelected(c,"hero","FreeHero",dest);assert.equal(p.status,"source-retrieved-not-rendered");assert.match(readFileSync(join(dest,"FreeHero.tsx"),"utf8"),/lucide-react/);assert.match(readFileSync(join(dest,"integration.md"),"utf8"),/Dependencies/);await assert.rejects(()=>exportSelected(c,"hero","FreeHero",dest),/already exists/);await assert.rejects(()=>exportSelected(c,"hero","LockedHero",join(dir,"denied")),/eligible/);assert.equal(existsSync(join(dir,"denied")),false);
 }finally{rmSync(dir,{recursive:true,force:true})}
});
test("server entitlement denial remains blocking even with supplied key",async()=>{
 const {fetcher}=mock({deny:true});const c=createClient({fetcher,key:"test-fixture-not-a-real-key"});const dir=mkdtempSync(join(tmpdir(),"taste-mcp-"));try{
 const dest=join(dir,"denied");await assert.rejects(()=>exportSelected(c,"hero","LockedHero",dest),/Access denied/);assert.equal(existsSync(dest),false);
 }finally{rmSync(dir,{recursive:true,force:true})}
});

test("brief lookup sends a predefined query, not private brief data",async()=>{
 const {fetcher,calls}=mock();const c=createClient({fetcher,key:""});
 const r=await lookupBrief(c,{job:"pricing",props:{title:"Confidential customer name"}});
 assert.equal(r.localJob,"pricing");assert.equal(r.offlineFallback,"StaySelector");
 assert.equal(r.remote.status,"no-match"); // fixture returns heroes, not pricing
 assert.ok(!JSON.stringify(calls).includes("Confidential customer name"));
});
