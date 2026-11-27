import {useId,useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {Location01Icon} from "@hugeicons/core-free-icons";
import {Action,clamp} from "./shared.jsx";
export function SceneHero({image,alt,title,description,eyebrow,caption="Illustrative terrain",points=[],ratio="1600 / 1067",labels={}}){
 const t={show:"Explore the map",hide:"Hide markers",...labels};
 const id=useId(),[active,setActive]=useState(false);
 return <section className="st st-scene" aria-labelledby={id}><div className="st-wrap">{eyebrow&&<div className="st-kicker">{eyebrow}</div>}<div className="st-scene-head"><h1 id={id}>{title}</h1><div><p>{description}</p><Action pressed={active} onClick={()=>setActive(!active)}>{active?t.hide:t.show}</Action></div></div><figure className={"st-scene-image "+(active?"is-mapped":"")} style={{aspectRatio:ratio}}><img src={image} alt={alt}/>{points.filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)).map((p,i)=><span key={p.label} className={"st-marker "+(active?"is-visible":"")} aria-hidden={!active} style={{left:clamp(p.x/100)*100+"%",top:clamp(p.y/100)*100+"%","--marker-delay":i*65+"ms"}}><HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} aria-hidden="true"/>{p.label}</span>)}</figure><div className="st-foot"><span role="status">{active?points.map(p=>p.label).join(" · "):caption}</span></div></div></section>
}
