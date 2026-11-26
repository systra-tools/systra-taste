import {createHash} from "node:crypto";
import {readFileSync,copyFileSync,mkdirSync,writeFileSync,existsSync,realpathSync} from "node:fs";
import {join,resolve} from "node:path";
import {fileURLToPath} from "node:url";

const root=fileURLToPath(new URL("../",import.meta.url));
export const catalog=JSON.parse(readFileSync(join(root,"engine/catalog.json"),"utf8"));
const jobs=Object.keys(catalog);
const plain=x=>x!==null&&typeof x==="object"&&!Array.isArray(x)&&Object.getPrototypeOf(x)===Object.prototype;
const text=x=>typeof x==="string"&&x.trim().length>0;
const number=x=>typeof x==="number"&&Number.isFinite(x);
const asset=x=>text(x)&&/^(?:\.\/)?(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.(?:webp|png|jpe?g|avif|gif)$/i.test(x)&&!x.split("/").includes("..");
const ratio=x=>typeof x==="string"&&/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/.test(x)&&x.split("/").every(v=>Number(v)>0);
const points=x=>Array.isArray(x)&&x.length>0&&x.every(p=>plain(p)&&text(p.label)&&number(p.x)&&number(p.y)&&p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100)&&new Set(x.map(p=>p.label)).size===x.length;
const polygon=x=>Array.isArray(x)&&x.length>=3&&x.length<=200&&x.every(p=>Array.isArray(p)&&p.length===2&&p.every(number));
const offers=x=>Array.isArray(x)&&x.length>0&&x.length<=12&&x.every(o=>plain(o)&&["id","name","price","unit"].every(k=>text(o[k]))&&Array.isArray(o.features)&&o.features.every(text))&&new Set(x.map(o=>o.id)).size===x.length;
const checks={title:text,description:text,eyebrow:text,caption:text,image:asset,alt:text,ratio,points,samples:x=>Array.isArray(x)&&x.length>0&&x.length<=500&&x.every(number),before:asset,after:asset,beforeAlt:text,afterAlt:text,beforeLabel:text,afterLabel:text,offers};
const normalize=x=>String(x??"").toLowerCase().normalize("NFKD").replace(/\p{Diacritic}/gu,"");
const words=x=>normalize(x).split(/[^a-z0-9]+/).filter(Boolean);
function match(brief){
 if(jobs.includes(brief.job))return brief.job;
 if(brief.job!==undefined)return null;
 const input=words(brief.brief);
 const scored=jobs.map(job=>({job,score:catalog[job].keywords.reduce((n,word)=>n+(input.includes(word)?1:0),0)})).sort((a,b)=>b.score-a.score);
 return scored[0].score>0&&scored[0].score>scored[1].score?scored[0].job:null;
}
export function plan(brief){
 if(!plain(brief))throw Error("Brief must be a JSON object");
 const job=match(brief);
 if(!job)return {status:"no-match",reason:"Unsupported or ambiguous job; choose a job or inspect authorized project/MCP components.",jobs};
 const entry=catalog[job],props=brief.props??{};
 if(!plain(props))throw Error("props must be an object");
 const allowed=[...entry.required,...entry.optional];
 const errors=Object.keys(props).filter(k=>!allowed.includes(k)).map(k=>"Unsupported prop: "+k);
 const missing=entry.required.filter(k=>props[k]===undefined);
 for(const k of Object.keys(props))if(allowed.includes(k)){
  const check=k==="points"&&job==="geometry"?polygon:checks[k];
  if(!check||!check(props[k]))errors.push("Invalid prop: "+k);
 }
 const theme=brief.theme??{};
 if(!plain(theme))throw Error("theme must be an object");
 const colors=["--paper","--ink","--muted","--surface"];
 const fonts=["--display","--body","--mono"];
 for(const [k,v] of Object.entries(theme)){
  if(colors.includes(k)?!(typeof v==="string"&&/^#[0-9a-f]{6}$/i.test(v)):fonts.includes(k)?!(typeof v==="string"&&/^[A-Za-z0-9 ,"'-]{1,100}$/.test(v)):true)errors.push("Invalid theme token: "+k);
 }
 return {status:missing.length||errors.length?"needs-input":"ready",job,source:"bundled-original",component:entry.component,file:entry.file,missing,errors,props,theme,dependencies:["react","@hugeicons/react","@hugeicons/core-free-icons"],assets:entry.required.filter(k=>["image","before","after"].includes(k)).map(k=>props[k]).filter(Boolean),mcp:{status:"not-called",query:entry.query},review:["Check the project's existing component and authorized MCP first","Verify assets and installed dependencies","Render desktop/mobile and active states","Test actual actions, focus and reduced motion"]};
}
export function materialize(brief,destination){
 const p=plan(brief);
 if(p.status!=="ready")throw Error(JSON.stringify(p));
 const dest=resolve(destination);
 if(existsSync(dest))throw Error("Destination already exists; choose a new directory.");
 // Fixed source filenames and JSON literals only. Never evaluate input or overwrite a project.
 mkdirSync(dest,{recursive:false});
 for(const file of [p.file,"shared.jsx","taste.css"])copyFileSync(join(root,"components",file),join(dest,file));
 const literal=x=>JSON.stringify(x,null,2).replace(/</g,"\\u003c").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029");
 // Set tokens on the actual .st root via a scoped stylesheet, not its parent.
 const scope="st-scope-"+createHash("sha256").update(JSON.stringify([p.job,p.theme])).digest("hex").slice(0,16);
 const css=Object.entries(p.theme).map(([k,v])=>k+":"+v+";").join("");
 writeFileSync(join(dest,"Section.jsx"),'import { '+p.component+' } from "./'+p.file+'";\nimport "./theme.css";\nconst props = '+literal(p.props)+';\nexport default function Section(){ return <div className="systra-generated '+scope+'"><'+p.component+' {...props}/></div>; }\n');
 writeFileSync(join(dest,"theme.css"),".systra-generated."+scope+" > .st{"+css+"}\n");
 writeFileSync(join(dest,"plan.json"),JSON.stringify(p,null,2)+"\n");
 return p;
}
if(process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url))){
 try{
 const [command,input,output]=process.argv.slice(2);
 if(!["plan","build"].includes(command)||!input||(command==="build"&&!output))throw Error("Usage: node engine.mjs plan brief.json | build brief.json NEW_DIRECTORY");
 const brief=JSON.parse(readFileSync(input,"utf8"));
 const result=command==="plan"?plan(brief):materialize(brief,output);
 console.log(JSON.stringify(result,null,2));if(result.status!=="ready")process.exitCode=2;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
