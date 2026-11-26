import {useEffect,useRef,useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {ArrowRight01Icon,ReloadIcon,Tick02Icon} from "@hugeicons/core-free-icons";
import "./taste.css";
export const clamp=(v,lo=0,hi=1)=>Math.min(hi,Math.max(lo,v));
export function Action({children,onClick,disabled=false,quiet=false,reset=false,pressed,checked=false}){const icon=reset?ReloadIcon:checked?Tick02Icon:ArrowRight01Icon;return <button type="button" onClick={disabled?undefined:onClick} aria-disabled={disabled||undefined} aria-pressed={pressed} className={"st-action "+(quiet?"st-quiet":"")}><span>{children}</span><span className="st-icon" aria-hidden="true"><HugeiconsIcon icon={icon} size={20} strokeWidth={1.5}/><HugeiconsIcon icon={icon} size={20} strokeWidth={1.5}/></span></button>}

// Interruptible, frame-based interpolation; never delays the semantic state.
export function useMotionNumber(target,duration=480){
 const [value,setValue]=useState(target),last=useRef(target);
 useEffect(()=>{
  const media=window.matchMedia("(prefers-reduced-motion: reduce)");
  let frame=0;const from=last.current,start=performance.now();
  const settle=()=>{cancelAnimationFrame(frame);last.current=target;setValue(target)};
  const tick=now=>{const t=clamp((now-start)/duration);const v=from+(target-from)*(1-Math.pow(1-t,3));last.current=v;setValue(v);if(t<1)frame=requestAnimationFrame(tick)};
  const preference=()=>{if(media.matches)settle()};
  media.addEventListener("change",preference);
  if(media.matches||from===target||duration<=0)settle();else frame=requestAnimationFrame(tick);
  return ()=>{cancelAnimationFrame(frame);media.removeEventListener("change",preference)};
 },[target,duration]);
 return value;
}
