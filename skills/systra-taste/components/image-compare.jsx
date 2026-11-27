import {useId,useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowLeft01Icon,ArrowRight01Icon} from "@hugeicons/core-free-icons";
import {Action,clamp} from "./shared.jsx";
export function ImageCompare({eyebrow,before,after,beforeAlt,afterAlt,title="See the difference.",description="Compare two versions of the same view.",beforeLabel="Before",afterLabel="After",ratio="16 / 9",labels={}}){
 const t={position:"Comparison position",original:"% original",reset:"Reset",...labels};
 const id=useId(),[pos,setPos]=useState(50),[dragging,setDragging]=useState(false);
 const move=e=>{const rect=e.currentTarget.getBoundingClientRect();if(rect.width>0)setPos(Math.round(clamp((e.clientX-rect.left)/rect.width)*100))};
 const start=e=>{if(!e.isPrimary||e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);setDragging(true);move(e)};
 const drag=e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))move(e)};
 const end=e=>{if(e.currentTarget.hasPointerCapture(e.pointerId)){move(e);e.currentTarget.releasePointerCapture(e.pointerId)}setDragging(false)};
 const cancel=e=>{if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);setDragging(false)};
 return <section className="st st-compare" aria-labelledby={id}><div className="st-wrap">{eyebrow&&<div className="st-kicker">{eyebrow}</div>}<div className="st-head"><h2 id={id}>{title}</h2><p>{description}</p></div><div className={"st-compare-stage "+(dragging?"is-dragging":"")} onPointerDown={start} onPointerMove={drag} onPointerUp={end} onPointerCancel={cancel} onLostPointerCapture={()=>setDragging(false)} style={{aspectRatio:ratio,"--split":pos+"%"}}><img src={after} alt={afterAlt}/><img className="st-before" src={before} alt={beforeAlt}/>{pos>=30&&<span className="st-compare-tag st-left">{beforeLabel}</span>}{pos<=70&&<span className="st-compare-tag st-right">{afterLabel}</span>}<div className="st-divider" aria-hidden="true"><div><HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={1.5}/><HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5}/></div></div></div><div className="st-controls"><label className="st-range">{t.position}<span>{pos}{t.original}</span><input type="range" aria-label={t.position} min="0" max="100" value={pos} onChange={e=>setPos(+e.target.value)}/></label><div className="st-actions"><Action quiet onClick={()=>setPos(100)}>{beforeLabel}</Action><Action quiet onClick={()=>setPos(0)}>{afterLabel}</Action><Action reset onClick={()=>setPos(50)}>{t.reset}</Action></div></div></div></section>
}
