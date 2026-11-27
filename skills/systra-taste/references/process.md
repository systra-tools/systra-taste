# Workflow / transformation: the transformation is the visual

Do not default to a dashboard of bars and numerical cells. Show a continuous causal path: input material, a visible processing zone, a readable result. A signal can move along a narrow track while the result changes; a before/after scrubber can expose real changes; a file can move into a folder. Select a metaphor that matches the actual task. Keep actual values available, not every raw value in a decorative cell.

## Original primitive: state-bound signal transformation

A data-native SVG diagram (not icon substitutes) shows the actual raw and normalized values on labeled, separate axes. The line is a deliberate handoff, and dot size/position encode real values. This is a min-max rescale, not noise removal. The same array is used for both views. No fictional metrics. SVG is a chart; actual controls use genuine Hugeicons.

~~~jsx
import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, ReloadIcon } from "@hugeicons/core-free-icons";

export function SignalTransform({ samples, title = "From noise to clarity.", description }) {
  const [active,setActive] = useState(false);
  const id = useId();
  const min = Math.min(...samples), max = Math.max(...samples);
  const output = samples.map(v => max === min ? 0 : (v-min)/(max-min));
  const rawScale = Math.max(1, max-min);
  const point = (v,i,isOutput) => {
    const x = 12 + i * 276 / Math.max(1,samples.length-1);
    const level = isOutput ? v : (v-min)/rawScale;
    return {x,y: 108-level*88,r: 2+level*2.4};
  };
  const plot = (values,isOutput) => (
    <svg viewBox="0 0 300 130" role="img" aria-label={isOutput?"Normalized values from zero to one":"Input samples on the raw range"} className="w-full overflow-visible">
      <path d="M12 20H288 M12 64H288 M12 108H288" fill="none" stroke="currentColor" strokeOpacity=".12"/>
      <polyline points={values.map((v,i)=>{const p=point(v,i,isOutput);return p.x+","+p.y}).join(" ")} stroke="currentColor" strokeOpacity=".55" strokeWidth="1.2" fill="none"/>
      {values.map((v,i)=>{const p=point(v,i,isOutput);return <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="currentColor"/>})}
    </svg>
  );
  return (
    <section className="bg-[#ffffff] px-5 py-14 text-[#111214] md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-[15ch] text-[clamp(2.5rem,6vw,5.75rem)] leading-none tracking-[-.055em]">{title}</h2>
        <p className="mt-5 max-w-xl text-lg text-neutral-700">{description}</p>
        <div className="mt-12 grid items-center gap-5 md:grid-cols-[1fr_100px_1fr] md:gap-8">
          <div className="min-w-0"><div className="flex justify-between text-sm"><span>Input</span><span>{samples.length} samples</span></div>
            <div className="mt-5 text-[#5b6069]">{plot(samples,false)}</div><p className="text-xs">Range: {min} to {max}</p>
          </div>
          <div aria-hidden="true" className="flex flex-col items-center justify-center gap-2 md:flex-row">
            <span className={"h-2 w-2 rounded-full "+(active?"bg-[#2d5bff]":"bg-neutral-400")}/>
            <span className="h-8 w-px bg-current opacity-30 md:h-px md:w-9"/>
            <HugeiconsIcon icon={ArrowRight01Icon} size={22} strokeWidth={1.5} className="rotate-90 md:rotate-0"/>
          </div>
          <div className="min-w-0"><div className="flex justify-between text-sm"><span>Output</span><span>{active?"Normalized":"Ready"}</span></div>
            <div className="mt-5 min-h-24 text-[#2d5bff]">{active?plot(output,true):<div className="aspect-[300/130] grid place-items-center bg-[#f3f4f6] rounded-lg text-sm text-neutral-600">Awaiting input</div>}</div>
            <p className="text-xs">{active?"Range: 0 to 1":"Scale after normalization: 0 to 1"}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" disabled={active} onClick={()=>setActive(true)} className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[#111214] px-5 text-white disabled:opacity-60">Normalize <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true"/></button>
          <button type="button" disabled={!active} onClick={()=>setActive(false)} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#f3f4f6] px-4 disabled:opacity-60"><HugeiconsIcon icon={ReloadIcon} size={20} strokeWidth={1.5} aria-hidden="true"/>Reset</button>
        </div>
        <details className="mt-6 text-sm"><summary className="cursor-pointer">Sample values</summary><p className="mt-3 break-words">Input: {samples.join(", ")}</p>{active&&<p className="mt-2 break-words">Output: {output.map(v=>v.toFixed(3)).join(", ")}</p>}</details>
        <p id={id} role="status" className="mt-4 text-sm text-neutral-600">{active?"Normalization complete.":"Ready to normalize."}</p>
      </div>
    </section>
  );
}
~~~

Assumes a nonempty finite numeric array; validate external data. Equal values normalize to zero. Use separately labeled axes, and never imply the algorithm removed noise.
