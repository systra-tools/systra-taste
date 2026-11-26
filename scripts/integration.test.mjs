import test from "node:test";
import assert from "node:assert/strict";
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import ts from "typescript";
import {migrate} from "../skills/systra-taste/engine/icons.mjs";
import {pagePlan,compose} from "../skills/systra-taste/engine/compose.mjs";
const icons=new Set(["ArrowRight01Icon","Tick02Icon"]);
test("migration preserves directive, aliases, type and JSX references",()=>{
 const s='"use client";\nimport {ArrowRight as Go, Check} from "lucide-react";\nconst list=[Go,Check];\nexport function C(){return <Go className="w-4"/>}';
 const r=migrate(s,ts,icons);assert.equal(r.status,"migrated-not-rendered");assert.ok(r.source.startsWith('"use client";'));assert.match(r.source,/const Go =/);assert.match(r.source,/<Go className/);assert.doesNotMatch(r.source,/lucide-react/);assert.equal(ts.createSourceFile("x.tsx",r.source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX).parseDiagnostics.length,0);
});
test("unsupported imports and missing exports fail closed",()=>{
 assert.equal(migrate('import {Unknown} from "lucide-react";',ts,icons).status,"blocked");
 assert.equal(migrate('import * as Icons from "lucide-react";',ts,icons).status,"blocked");
 assert.equal(migrate('import {Check} from "lucide-react";',ts,new Set()).status,"blocked");
 assert.equal(migrate('export const a=1;',{},icons).status,"blocked");
});
test("composition preserves order and warns on incoherent roles",()=>{
 const p=pagePlan({sections:[{role:"pricing",file:"a.tsx",export:"A"},{role:"hero",file:"b.tsx",export:"B"}],theme:{background:"#ffffff",radius:8}});
 assert.equal(p.sections[0].role,"pricing");assert.ok(p.warnings.length);
 assert.throws(()=>pagePlan({sections:p.sections,theme:{background:"red;}body{}"}}));
});
test("composition creates a page without changing existing source",()=>{
 const root=mkdtempSync(join(tmpdir(),"taste-compose-"));try{
 const a=join(root,"hero.tsx"),b=join(root,"offer.tsx");writeFileSync(a,"export function Hero(){return null;}");writeFileSync(b,"export function Offer(){return null;}");
 const brief={sections:[{role:"hero",file:"hero.tsx",export:"Hero"},{role:"pricing",file:"offer.tsx",export:"Offer"}],theme:{display:"Albert Sans, sans-serif",radius:10}};
 const target=join(root,"page");compose(brief,target,root);
 assert.match(readFileSync(join(target,"Page.tsx"),"utf8"),/<Section0 key=\{0\}\/><Section1/);assert.match(readFileSync(join(target,"theme.css"),"utf8"),/--st-radius:10px/);assert.equal(readFileSync(a,"utf8"),"export function Hero(){return null;}");assert.throws(()=>compose(brief,target,root));
 }finally{rmSync(root,{recursive:true,force:true});}
});
