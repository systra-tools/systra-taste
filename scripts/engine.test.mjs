import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,readFileSync,rmSync,existsSync,writeFileSync,symlinkSync} from "node:fs";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {plan,materialize,catalog} from "../skills/systra-taste/engine/engine.mjs";
const common={title:"Test title",description:"Test description"};
const samples={
 hero:{...common,image:"assets/hills.webp",alt:"Hills",ratio:"16 / 9",points:[{label:"Hill",x:50,y:40}]},
 signal:{...common,samples:[1,2,3]},
 geometry:{...common,points:[[0,0],[100,0],[50,100]]},
 comparison:{...common,before:"assets/a.webp",after:"assets/b.webp",beforeAlt:"Original",afterAlt:"Edited",ratio:"16 / 9"},
 pricing:{...common,image:"assets/a.webp",alt:"Landscape",offers:[{id:"a",name:"Day",price:"€45",unit:"day",features:["Workspace"]}]}
};
for(const [job,props] of Object.entries(samples)){
 test("engine selects and materializes "+job,()=>{
  const p=plan({job,props});assert.equal(p.status,"ready");assert.equal(p.component,catalog[job].component);assert.equal(p.mcp.status,"not-called");
  const dir=mkdtempSync(join(tmpdir(),"taste-engine-"));try{
   const dest=join(dir,"section");materialize({job,props},dest);
   const source=readFileSync(join(dest,p.file),"utf8");assert.equal(source,readFileSync(new URL("../skills/systra-taste/components/"+p.file,import.meta.url),"utf8"));
   assert.ok(readFileSync(join(dest,"Section.jsx"),"utf8").includes("<"+p.component+" {...props}/>"));
   assert.throws(()=>materialize({job,props},dest),/already exists/);
  }finally{rmSync(dir,{recursive:true,force:true})}
 });
}
test("unknown and ambiguous jobs refuse to guess",()=>{
 assert.equal(plan({brief:"contact form newsletter"}).status,"no-match");
 assert.equal(plan({brief:"geometry pricing"}).status,"no-match");
 assert.equal(plan({job:"unsupported"}).status,"no-match");
 assert.equal(plan({brief:"newsletter signup"}).status,"no-match");
});
test("matching German and English briefs",()=>{
 assert.equal(plan({brief:"Interaktiver Bildvergleich",props:samples.comparison}).job,"comparison");
 assert.equal(plan({brief:"normalize signal samples",props:samples.signal}).status,"ready");
});
test("reject missing and invalid inputs without writes",()=>{
 const dir=mkdtempSync(join(tmpdir(),"taste-engine-"));try{
  const dest=join(dir,"missing");
  assert.equal(plan({job:"signal",props:common}).status,"needs-input");
  assert.throws(()=>materialize({job:"signal",props:common},dest));
  assert.equal(existsSync(dest),false);
  assert.equal(plan({job:"comparison",props:{...samples.comparison,before:"../secret.webp"}}).status,"needs-input");
  assert.equal(plan({job:"geometry",props:{...samples.geometry,points:[[0,0],[1,1],[2,Infinity]]}}).status,"needs-input");
  assert.equal(plan({job:"pricing",props:{...samples.pricing,offers:[samples.pricing.offers[0],samples.pricing.offers[0]]}}).status,"needs-input");
 }finally{rmSync(dir,{recursive:true,force:true})}
});
test("theme and props validated; strings are data, not executable code",()=>{
 const p=plan({job:"geometry",props:samples.geometry,theme:{"--paper":"#f4f1ea","--display":"Instrument Serif, Georgia, serif"}});
 assert.equal(p.status,"ready");
 assert.equal(plan({job:"geometry",props:samples.geometry,theme:{"--paper":"red;}body{display:none"}}).status,"needs-input");
 assert.equal(plan({job:"geometry",props:{...samples.geometry,onClick:"alert(1)"}}).status,"needs-input");
 const dir=mkdtempSync(join(tmpdir(),"taste-engine-"));try{
 const dest=join(dir,"section");materialize({job:"geometry",props:{...samples.geometry,title:'</script> ${hello} "quoted"'}},dest);
 const source=readFileSync(join(dest,"Section.jsx"),"utf8");assert.ok(!source.includes("</script>"));assert.ok(source.includes("\\u003c/script>"));
 }finally{rmSync(dir,{recursive:true,force:true})}
});

test("CLI executes through a symlinked skill path",()=>{
 const dir=mkdtempSync(join(tmpdir(),"taste-cli-"));try{
  const skill=fileURLToPath(new URL("../skills/systra-taste/",import.meta.url));
  const link=join(dir,"skill");symlinkSync(skill,link,"dir");
  const brief=join(dir,"brief.json");writeFileSync(brief,JSON.stringify({job:"geometry",props:samples.geometry}));
  const result=JSON.parse(execFileSync(process.execPath,[join(link,"engine","engine.mjs"),"plan",brief],{encoding:"utf8"}));
  assert.equal(result.status,"ready");
 }finally{rmSync(dir,{recursive:true,force:true})}
});

test("different themes do not share a CSS scope",()=>{
 const dir=mkdtempSync(join(tmpdir(),"taste-scope-"));try{
  const a=join(dir,"a"),b=join(dir,"b");
  materialize({job:"geometry",props:samples.geometry,theme:{"--paper":"#ffffff"}},a);
  materialize({job:"geometry",props:samples.geometry,theme:{"--paper":"#000000"}},b);
  const selector=x=>readFileSync(join(x,"theme.css"),"utf8").split("{")[0];
  assert.notEqual(selector(a),selector(b));
  for(const dest of [a,b])assert.ok(readFileSync(join(dest,"Section.jsx"),"utf8").includes(selector(dest).match(/st-scope-[a-f0-9]+/)[0]));
 }finally{rmSync(dir,{recursive:true,force:true})}
});
