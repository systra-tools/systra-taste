import {useId,useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {Tick02Icon} from "@hugeicons/core-free-icons";
import {Action} from "./shared.jsx";
export function StaySelector({title,description,image,alt,offers,onSelect,eyebrow="Stillwater"}){
 const id=useId(),[selection,setSelection]=useState(null),selected=offers.find(o=>o.id===selection);
 return <section className="st st-stay" aria-labelledby={id}><div className="st-wrap"><div className="st-kicker">{eyebrow}<span>STAY SELECTOR</span></div><div className="st-head"><h2 id={id}>{title}</h2><p>{description}</p></div><div className="st-stay-grid"><div className="st-stay-preview"><img src={image} alt={alt}/><div><span>{selected?"Your selection":"Your next stay"}</span><strong>{selected?selected.name:"Make space."}</strong>{selected&&<p>{selected.price}/{selected.unit}</p>}</div></div><div className="st-options" aria-label="Available stays">{offers.map(o=><article key={o.id} className={selection===o.id?"is-selected":""}><div className="st-price"><h3>{o.name}</h3><p>{o.price}<small>/{o.unit}</small></p></div><ul>{o.features.map(f=><li key={f}><HugeiconsIcon icon={Tick02Icon} size={16} strokeWidth={1.5} aria-hidden="true"/>{f}</li>)}</ul><Action quiet={selection!==o.id} checked={selection===o.id} pressed={selection===o.id} onClick={()=>{setSelection(o.id);onSelect?.(o)}}>Choose {o.name}</Action></article>)}</div></div><p role="status" className="st-foot">{selected?selected.name+" selected.":"No stay selected."}</p></div></section>
}
