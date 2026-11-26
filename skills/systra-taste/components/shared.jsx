import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowRight01Icon,ReloadIcon,Tick02Icon} from "@hugeicons/core-free-icons";
import "./taste.css";
export const clamp=(v,lo=0,hi=1)=>Math.min(hi,Math.max(lo,v));
export function Action({children,onClick,disabled=false,quiet=false,reset=false,pressed,checked=false}){const icon=reset?ReloadIcon:checked?Tick02Icon:ArrowRight01Icon;return <button type="button" onClick={onClick} disabled={disabled} aria-pressed={pressed} className={"st-action "+(quiet?"st-quiet":"")}><span>{children}</span><span className="st-icon" aria-hidden="true"><HugeiconsIcon icon={icon} size={20} strokeWidth={1.5}/><HugeiconsIcon icon={icon} size={20} strokeWidth={1.5}/></span></button>}
