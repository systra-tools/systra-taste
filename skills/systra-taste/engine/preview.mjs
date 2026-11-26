import {createRequire} from "node:module";
import {createServer} from "node:http";
import {readFileSync,writeFileSync,mkdirSync,existsSync,realpathSync,statSync} from "node:fs";
import {resolve,join,relative,extname} from "node:path";
import {fileURLToPath} from "node:url";
const types={".html":"text/html",".js":"text/javascript",".mjs":"text/javascript",".css":"text/css",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".woff2":"font/woff2",".woff":"font/woff"};
export async function preview(project,build,dest,{executablePath=process.env.CHROME_PATH}={}){
 const root=realpathSync(build),target=resolve(dest);
 if(existsSync(target))throw Error("Destination exists.");
 if(!existsSync(join(root,"index.html")))throw Error("Build an approved local project first.");
 const req=createRequire(join(resolve(project),"package.json"));
 const {chromium}=req("playwright-core");
 const server=createServer((request,response)=>{try{
  const path=decodeURIComponent(new URL(request.url,"http://localhost").pathname);
  const file=realpathSync(resolve(root,"."+(path==="/"?"/index.html":path))),rel=relative(root,file);
  if(rel.startsWith("..")||!statSync(file).isFile())throw Error();
  response.setHeader("Content-Type",types[extname(file)]||"application/octet-stream");response.end(readFileSync(file));
 }catch{response.writeHead(404);response.end();}});
 await new Promise(r=>server.listen(0,"127.0.0.1",r));
 const origin="http://127.0.0.1:"+server.address().port;
 let browser;const results=[];
 try{
  browser=await chromium.launch({headless:true,...(executablePath?{executablePath}:{})});
  mkdirSync(target,{recursive:false});
  for(const width of [1440,390,320]){
   const p=await browser.newPage({viewport:{width,height:900},reducedMotion:"reduce"});
   const errors=[],failed=[],blocked=[];
   await p.route("**/*",r=>{const u=r.request().url();if(u.startsWith(origin+"/")||u.startsWith("data:")||u.startsWith("blob:"))return r.continue();blocked.push(u);return r.abort();});
   p.on("pageerror",e=>errors.push(e.message));p.on("response",r=>{if(r.status()>=400)failed.push(new URL(r.url()).pathname)});
   await p.goto(origin,{waitUntil:"load",timeout:15000});
   await p.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
   await p.waitForTimeout(300);
   const metrics=await p.evaluate(()=>({horizontalOverflow:document.documentElement.scrollWidth>innerWidth,brokenImages:[...document.images].filter(i=>!i.naturalWidth).length,visibleText:document.body.innerText.trim().length,placeholderLinks:[...document.querySelectorAll("a[href='#']")].length}));
   await p.screenshot({path:join(target,width+".png"),fullPage:true,animations:"disabled"});
   results.push({width,...metrics,errors,failed,blocked,passed:!metrics.horizontalOverflow&&!metrics.brokenImages&&metrics.visibleText>0&&!errors.length&&!failed.length&&!blocked.length});
   await p.close();
  }
 }finally{await browser?.close();server.close();}
 const report={status:results.every(x=>x.passed)?"rendered-needs-visual-review":"render-defects",results,notes:["Initial static screens only; test active states separately.","Visual quality, accessibility, and content are not certified. Placeholder links require review."]};
 writeFileSync(join(target,"preview-report.json"),JSON.stringify(report,null,2)+"\n");return report;
}
if(process.argv[1]&&realpathSync(process.argv[1])===realpathSync(fileURLToPath(import.meta.url))){
 try{const [project,build,dest]=process.argv.slice(2);if(!project||!build||!dest)throw Error("Usage: node preview.mjs PROJECT BUILT_DIRECTORY NEW_OUTPUT");console.log(JSON.stringify(await preview(project,build,dest),null,2));}catch(e){console.error(e.message);process.exitCode=1;}
}
