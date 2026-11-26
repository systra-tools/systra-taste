import {useId,useState} from "react";
import {Action,clamp,useMotionNumber} from "./shared.jsx";
export function SignalTrace({samples,title="From noise to clarity.",description="Normalize a sequence without changing its order."}){
 const id=useId(),[done,setDone]=useState(false),[sample,setSample]=useState(0);
 const progress=useMotionNumber(done?1:0,650);
 if(!Array.isArray(samples)||!samples.length||samples.some(v=>!Number.isFinite(v)))return <p>Provide finite numeric samples.</p>;
 const i=Math.min(sample,samples.length-1),min=Math.min(...samples),max=Math.max(...samples),span=max-min,low=Math.min(0,min),high=Math.max(1,max),out=samples.map(v=>span?clamp((v-min)/span):0);
 const plot=(values,lo,hi,amount,label)=>{
  const pts=values.map((v,j)=>[23+j*254/Math.max(1,values.length-1),142-clamp((v-lo)/(hi-lo||1))*112]);
  const clipId=id.replace(/[^a-zA-Z0-9_-]/g,"")+"-reveal-"+(label==="Raw sample values"?"input":"output");
  return <svg className="st-plot" viewBox="0 0 300 170" role="img" aria-label={label}>
   {[0,.5,1].map(t=><path key={t} d={"M23 "+(142-t*112)+"H277"} stroke="currentColor" strokeOpacity=".18" strokeDasharray={t===0?undefined:"2 5"}/>)}
   <defs><clipPath id={clipId}><rect x="0" y="0" width={300*amount} height="170"/></clipPath></defs>
   {amount<1&&pts.map(([x],j)=><circle key={"pending-"+j} cx={x} cy="142" r="1.6" opacity={.2*(1-amount)} fill="currentColor"/>)}
   <g clipPath={"url(#"+clipId+")"}>
   <polyline points={pts.map(p=>p.join(",")).join(" ")} stroke="currentColor" strokeWidth="1.3" strokeOpacity={amount*.65} fill="none"/>
   {pts.map(([x,y],j)=><circle key={j} cx={x} cy={y} r={j===i?4.5:2.1+clamp((values[j]-lo)/(hi-lo||1))*1.5} fill="currentColor" opacity={.32+.68*amount}/>)}
   <circle cx={pts[i][0]} cy={pts[i][1]} r="8" fill="none" stroke="currentColor" strokeOpacity={amount*.7}/>
   </g>
   <text x="23" y="17" fontSize="11" fill="currentColor">{hi}</text><text x="23" y="163" fontSize="11" fill="currentColor">{lo}</text>
  </svg>
 };
 return <section className="st st-trace" aria-labelledby={id}><div className="st-wrap"><div className="st-kicker">SIGNAL / 01 <span>{samples.length} samples</span></div><div className="st-head"><h2 id={id}>{title}</h2><p>{description}</p></div><div className="st-trace-stage" data-progress={progress.toFixed(3)}><div className="st-pane"><div className="st-line">Input<span>Raw scale</span></div>{plot(samples,low,high,1,"Raw sample values")}<div className="st-line">Sample {i+1}<strong>{samples[i]}</strong></div></div><div aria-hidden="true" className={"st-conduit "+(done?"is-done":"")}><span>RESCALE</span><div>{Array.from({length:7},(_,j)=><i key={j} style={{"--i":j,"--d":3+j*.7+"px"}}/>)}</div><span>{done?(progress<.999?"REVEALING":"PROCESSED"):"READY"}</span></div><div className={"st-pane st-output "+(done?"is-done":"")}><div className="st-line">Output<span>{done?"0–1 scale":"Awaiting input"}</span></div>{plot(out,0,1,progress,done?"Normalized values":"Awaiting output")}<div className="st-line">Sample {i+1}<strong>{done?out[i].toFixed(3):"Not processed"}</strong></div></div></div><div className="st-controls"><label className="st-range">Inspect sample<span>{i+1} / {samples.length}</span><input type="range" aria-label="Inspect sample" min="0" max={samples.length-1} value={i} onChange={e=>setSample(+e.target.value)}/></label><div className="st-actions"><Action disabled={done} onClick={()=>setDone(true)}>Normalize</Action><Action quiet reset disabled={!done} onClick={()=>setDone(false)}>Reset</Action></div></div><div className="st-foot"><span role="status">{done?"Normalization complete.":"Ready to normalize."}</span><span>{span?"(value − "+min+") / ("+max+" − "+min+")":"Constant input maps to 0"}</span></div><details className="st-values"><summary>Inspect numeric values</summary><p>Input: {samples.join(", ")}</p>{done&&<p>Output: {out.map(v=>v.toFixed(3)).join(", ")}</p>}</details></div></section>
}
