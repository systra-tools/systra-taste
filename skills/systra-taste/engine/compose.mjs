import {readFileSync,writeFileSync,mkdirSync,existsSync,realpathSync,copyFileSync} from "node:fs";
import {resolve,join,basename,dirname,relative} from "node:path";
import {fileURLToPath} from "node:url";
const roles=["hero","intro","features","workflow","proof","pricing","faq","cta","footer"];
const colors=["background","foreground","muted","surface","accent"];
const fonts=["display","body","mono"];
export function pagePlan(brief){
 if(!brief||typeof brief!=="object"||!Array.isArray(brief.sections)||!brief.sections.length||brief.sections.length>12)throw Error("Supply 1–12 sections.");
 const seen=new Set(),warnings=[];
 for(const s of brief.sections){
  if(!roles.includes(s.role)||typeof s.file!=="string"||!/^[$A-Za-z_][\w$]*$/.test(s.export??""))throw Error("Invalid section role, file or export.");
  if(seen.has(s.role))warnings.push("Repeated role: "+s.role);
  seen.add(s.role);
 }
 if(brief.sections.some((s,i)=>i&&roles.indexOf(s.role)<roles.indexOf(brief.sections[i-1].role)))warnings.push("Section order needs review; order preserved.");
 if(!seen.has("hero"))warnings.push("No hero selected.");
 const theme=brief.theme??{};
 if(typeof theme!=="object"||Array.isArray(theme))throw Error("Invalid theme.");
 for(const [k,v] of Object.entries(theme)){
  if(colors.includes(k)?!/^#[0-9a-fA-F]{6}$/.test(v):fonts.includes(k)?!(typeof v==="string"&&/^[A-Za-z0-9 ,"'-]{1,100}$/.test(v)):k==="radius"?!(Number.isInteger(v)&&v>=0&&v<=24):true)throw Error("Invalid token: "+k);
 }
 return {sections:brief.sections.map(s=>({role:s.role,file:s.file,export:s.export})),theme,warnings,status:"composition-planned-not-rendered",review:["Check matching audience, story and content","Review all hardcoded colors, fonts and radii in imported source","Check real CTA destinations and accessibility","Render desktop and mobile"]};
}
export function compose(brief,dest,base){
 const p=pagePlan(brief),target=resolve(dest);
 if(existsSync(target))throw Error("Destination exists.");
 const root=realpathSync(base);
 const sections=p.sections.map(s=>{
  const file=realpathSync(resolve(root,s.file)),r=relative(root,file);
  if(r.startsWith("..")||! /\.tsx$|\.jsx$/.test(file))throw Error("Section source must be JSX/TSX inside the approved project.");
  return {...s,file};
 });
 // Keep original files in place, so relative imports resolve. Create an entry in a sibling/new directory.
 mkdirSync(target,{recursive:false});
 const imp=sections.map((s,i)=>'import { '+s.export+' as Section'+i+' } from '+JSON.stringify(relative(target,s.file).startsWith(".")?relative(target,s.file):"./"+relative(target,s.file))+';').join("\n");
 writeFileSync(join(target,"Page.tsx"),imp+'\nimport "./theme.css";\nexport default function Page(){return <main className="st-engine-page">'+sections.map((_,i)=>'<Section'+i+' key={'+i+'}/>').join("")+'</main>;}\n');
 const css=Object.entries(p.theme).map(([k,v])=>k==="radius"?"--st-radius:"+v+"px;":"--st-"+k+":"+v+";").join("");
 writeFileSync(join(target,"theme.css"),'.st-engine-page{'+css+'background:var(--st-background,transparent);color:var(--st-foreground,inherit);font-family:var(--st-body,inherit)}\n.st-engine-page .font-display{font-family:var(--st-display,inherit)}\n.st-engine-page .font-body{font-family:var(--st-body,inherit)}\n.st-engine-page .font-mono{font-family:var(--st-mono,monospace)}\n');
 writeFileSync(join(target,"page-plan.json"),JSON.stringify(p,null,2)+"\n");return p;
}
if(process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url))){
 try{const [input,dest,base]=process.argv.slice(2);if(!input||!dest||!base)throw Error("Usage: node compose.mjs PAGE.json NEW_DIRECTORY APPROVED_PROJECT");
 console.log(JSON.stringify(compose(JSON.parse(readFileSync(input,"utf8")),dest,base),null,2));
 }catch(e){console.error(e.message);process.exitCode=1;}
}
