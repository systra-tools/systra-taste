import {useId,useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {Location01Icon} from "@hugeicons/core-free-icons";
import {Action} from "./shared.jsx";
export function SceneHero({image,alt,title,description,eyebrow="Terrain",caption="Illustrative terrain",points=[],ratio="1600 / 1067"}){
 const id=useId(),[active,setActive]=useState(false);
 return <section className="st st-scene" aria-labelledby={id}><div className="st-wrap"><div className="st-kicker">{eyebrow}<span>{caption}</span></div><div className="st-scene-head"><h1 id={id}>{title}</h1><div><p>{description}</p><Action pressed={active} onClick={()=>setActive(!active)}>{active?"Hide markers":"Explore the map"}</Action></div></div><figure className="st-scene-image" style={{aspectRatio:ratio}}><img src={image} alt={alt}/>{active&&points.map(p=><span key={p.label} className="st-marker" style={{left:p.x+"%",top:p.y+"%"}}><HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} aria-hidden="true"/>{p.label}</span>)}</figure><div className="st-foot"><span role="status">{active?points.map(p=>p.label).join(" · "):caption}</span><span>{active?"Overlay enabled":"01 / Scene"}</span></div></div></section>
}
