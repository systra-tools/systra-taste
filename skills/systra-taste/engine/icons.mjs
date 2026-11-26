import {readFileSync,writeFileSync,mkdirSync,existsSync,realpathSync} from "node:fs";
import {resolve,join,dirname,basename} from "node:path";
import {fileURLToPath} from "node:url";
import {createRequire} from "node:module";

export const iconMap={ArrowRight:"ArrowRight01Icon",ArrowLeft:"ArrowLeft01Icon",ArrowUpRight:"ArrowUpRight01Icon",ArrowDown:"ArrowDown01Icon",ArrowUp:"ArrowUp01Icon",ChevronDown:"ArrowDown01Icon",ChevronUp:"ArrowUp01Icon",ChevronRight:"ArrowRight01Icon",ChevronLeft:"ArrowLeft01Icon",Check:"Tick02Icon",CheckCircle:"CheckmarkCircle01Icon",Store:"Store01Icon",Building2:"Building03Icon",Warehouse:"WarehouseIcon",Plus:"PlusSignIcon",Minus:"MinusSignIcon",X:"Cancel01Icon",Menu:"Menu01Icon",Search:"Search01Icon",Play:"PlayIcon",Pause:"PauseIcon",MapPin:"Location01Icon",Mail:"Mail01Icon",Aperture:"ApertureIcon",Moon:"Moon02Icon",Sun:"Sun01Icon",BatteryMedium:"BatteryMediumIcon",Clapperboard:"ClapperboardIcon"};
// A parser, not regex rewriting of JSX or strings. Uses the target project's TypeScript dependency.
export function migrate(source,ts,available){
 if(!ts?.createSourceFile||!ts.ScriptTarget||!ts.ScriptKind)return {status:"blocked",reason:"TypeScript compiler API required (tested with TypeScript 5.9)."};
 const tree=ts.createSourceFile("component.tsx",source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 if(tree.parseDiagnostics.length)return {status:"blocked",reason:"Source has syntax errors."};
 const edits=[],mapped=[],unknown=[];
 for(const stmt of tree.statements){
  if(!ts.isImportDeclaration(stmt)||stmt.moduleSpecifier.text!=="lucide-react")continue;
  const c=stmt.importClause;
  if(!c||c.name||c.isTypeOnly||!c.namedBindings||!ts.isNamedImports(c.namedBindings))return {status:"blocked",reason:"Unsupported Lucide import shape."};
  for(const e of c.namedBindings.elements){
   const original=e.propertyName?.text??e.name.text,local=e.name.text,target=iconMap[original];
   if(e.isTypeOnly||!target||!available.has(target))unknown.push(original);
   else mapped.push({original,local,target});
  }
  edits.push({start:stmt.getStart(tree),end:stmt.end,text:""});
 }
 if(unknown.length)return {status:"blocked",reason:"Unmapped or unavailable icons",unknown:[...new Set(unknown)]};
 if(!mapped.length)return {status:"unchanged",source,mapped:[]};
 if(tree.statements.some(s=>ts.isExportDeclaration(s)&&s.moduleSpecifier?.text==="lucide-react"))return {status:"blocked",reason:"Lucide re-export needs manual review."};
 // Preserve aliases, dynamic component references and typeof Icon; wrap genuine Hugeicons.
 // Unique generated names are checked against original source to prevent name collisions.
 let prefix="StHuge";
 while(source.includes(prefix))prefix+="_";
 const header='import { HugeiconsIcon as '+prefix+'Render } from "@hugeicons/react";\nimport { '+mapped.map((m,i)=>m.target+' as '+prefix+i).join(", ")+' } from "@hugeicons/core-free-icons";\nimport type { ComponentProps as '+prefix+'Props } from "react";\n';
 const adapters=mapped.map((m,i)=>'const '+m.local+' = (props: Omit<'+prefix+'Props<typeof '+prefix+'Render>, "icon">) => <'+prefix+'Render aria-hidden="true" {...props} icon={'+prefix+i+'} />;').join("\n");
 let updated=source;
 for(const e of edits.sort((a,b)=>b.start-a.start))updated=updated.slice(0,e.start)+updated.slice(e.end);
 // Preserve use-client directive at beginning.
 const next=ts.createSourceFile("component.tsx",updated,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 let insert=0;for(const s of next.statements){if(ts.isExpressionStatement(s)&&ts.isStringLiteral(s.expression))insert=s.end;else break;}
 updated=updated.slice(0,insert)+"\n"+header+adapters+"\n"+updated.slice(insert);
 // Other references (require, dynamic import) are not silently accepted.
 if(updated.includes('lucide-react'))return {status:"blocked",reason:"Remaining Lucide reference; manual review required."};
 return {status:"migrated-not-rendered",source:updated,mapped};
}
export async function migrateFile(input,destination,project){
 const req=createRequire(join(resolve(project),"package.json"));
 const ts=req("typescript"),exports=req("@hugeicons/core-free-icons");
 const result=migrate(readFileSync(input,"utf8"),ts,new Set(Object.keys(exports)));
 if(result.status==="blocked")return result;
 if(existsSync(destination))throw Error("Destination already exists.");
 mkdirSync(destination,{recursive:false});
 writeFileSync(join(destination,basename(input)),result.source);
 const {source,...report}=result;
 writeFileSync(join(destination,"icon-report.json"),JSON.stringify(report,null,2)+"\n");
 return report;
}
if(process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url))){
 try{const [input,dest,project]=process.argv.slice(2);if(!input||!dest||!project)throw Error("Usage: node icons.mjs INPUT.tsx NEW_DIRECTORY TARGET_PROJECT");
 const r=await migrateFile(input,dest,project);console.log(JSON.stringify(r,null,2));if(r.status==="blocked")process.exitCode=2;
 }catch(e){console.error(e.message);process.exitCode=1;}
}
