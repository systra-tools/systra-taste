# Interaction atlas: 20 motion patterns and 15 control patterns

Original implementation recipes. These are not bundled Systra premium component sources. Prefer meaningful state over decoration. All timings are starting points; verify in context. Use genuine Hugeicons from the installed packages, never Unicode substitutes. Keep visible keyboard focus and a reduced-motion static state.

## Shared primitives

~~~css
:root {
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
  --fast: 160ms;
  --medium: 280ms;
  --slow: 480ms;
}
.motion-clip { overflow: clip; }
.motion-reveal { animation: reveal var(--slow) var(--ease-out) both; }
@keyframes reveal { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.state-surface { transition: background-color var(--fast), color var(--fast); }
.control { min-height: 44px; border-radius: 8px; }
.control:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.icon-track { position: relative; display: grid; place-items: center; width: 20px; height: 20px; overflow: clip; }
.icon-track > * { grid-area: 1/1; transition: transform var(--medium) var(--ease-out); }
.icon-track > :last-child { transform: translateX(-24px); }
.control:is(:hover,:focus-visible) .icon-track > :first-child { transform: translateX(24px); }
.control:is(:hover,:focus-visible) .icon-track > :last-child { transform: translateX(0); }
@media (prefers-reduced-motion: reduce) {
  .motion-reveal { animation: none; }
  .state-surface, .icon-track > * { transition: none; }
  .control:is(:hover,:focus-visible) .icon-track > :first-child { transform: none; }
  .control:is(:hover,:focus-visible) .icon-track > :last-child { transform: translateX(-24px); }
}
~~~

~~~jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
export function ArrowAction({ children, href }) {
  return <a href={href} className="control inline-flex items-center gap-3 px-4">
    {children}
    <span className="icon-track" aria-hidden="true">
      <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} />
      <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} />
    </span>
  </a>;
}
~~~

## 20 motion recipes

Each entry identifies the state, implementation and constraint. Combine at most a few per section.

| # | Pattern | Implementation recipe | Guardrail |
| --- | --- | --- | --- |
| 1 | Clipped line arrival | Wrap each intentional line in motion-clip; animate child translateY(14px) and opacity over 480ms, stagger 60ms | Keep text visible without JS; no forced rewrap |
| 2 | Scene crop reveal | Animate image clip-path from inset(10% 12%) to inset(0) over 600ms | Static full image under reduced motion |
| 3 | Image-to-background handoff | Interpolate a single image container's scale 0.82 to 1 using scroll progress; use transform-origin at subject | Never pin mobile reading |
| 4 | Before/after scrubber | Bind range input 0 to 100 to --split; clip top image with inset(0 calc(100% - var(--split)) 0 0) | Label range and offer keyboard operation |
| 5 | Trace-line progress | Set SVG pathLength=1 and stroke-dasharray=1; stroke-dashoffset=1-progress | SVG diagram only, not substitute icons |
| 6 | Signal nodes | Bind dot sizes and active fill to real stage index; use transform:scale and 180ms easing | No fabricated numerical scale |
| 7 | Morphing specimen | Interpolate same-topology SVG path points or border-radius between selected states | No random morph; static meaningful shape |
| 8 | Input-to-output handoff | Keep both panes mounted; animate output opacity and a single signal translation on completion | Announce actual result in aria-live |
| 9 | Folder intake | Animate selected file translateY into clipped folder region then update count | State must persist; no phantom success |
| 10 | Step-linked image | On active accordion state, crossfade two approved images over 300ms | Text is not hidden with image |
| 11 | Stacked card handoff | Use 2 to 3 known layers, translate and scale active layer on selection | Keep tab order and active panel clear |
| 12 | Thumbnail spotlight | Use stable aspect-ratio stage; crossfade selected crop over 280ms | Buttons have accessible names |
| 13 | Editorial word emphasis | Apply state-based color class to meaningful words with 160ms transition | No scroll-dependent legibility |
| 14 | Numerical progression | Update real numeric state; animate optional visual counter while accessible value is final | Never animate invented metrics |
| 15 | Comparison bar | Transform scaleX from 0 to value / max with origin-left; show exact units | Same denominator and visible text |
| 16 | Panel parting | Translate decorative side panels outward 8 to 12% when activated | CTA remains stable and clickable |
| 17 | Inline media expansion | Use transform:scale on inline crop within reserved width, or CSS grid slot expansion | Avoid shifting words on hover |
| 18 | Tab indicator | Measure selected button position; translate indicator and width, 250ms | aria-selected and keyboard tab behavior |
| 19 | Quote exchange | Crossfade outgoing/incoming quote in stable min-height region, 220ms | No autoplay; screen reader can access active quote |
| 20 | Footer scene fade | Use mask-image only on decorative photo, linear-gradient(to bottom,#000 65%,transparent 100%) | Footer links are never masked |

## 15 control recipes

Use CSS state selectors and semantic native elements. The visible label stays stable unless state or action genuinely changes. Icon-only controls need aria-label. For links use real href; for actions use buttons.

| # | Control | Exact interaction |
| --- | --- | --- |
| 1 | Arrow exchange | Use ArrowAction and icon-track above, 280ms, clipped horizontal exchange |
| 2 | Diagonal destination | Use genuine diagonal arrow from verified export; translate 3px up/right under hover/focus |
| 3 | Quiet text link | ::after underline scaleX(0) to scaleX(1), transform-origin:left, 180ms; underline remains on focus |
| 4 | Filled primary | Transition background-color 160ms; active translateY(1px), no box shadow |
| 5 | Secondary surface | Neutral surface changes one tone; focus-visible outline separate from hover |
| 6 | Split action | Separate main button and menu button with distinct labels; use real menu state |
| 7 | Toggle control | aria-pressed; translate thumb 16px; color and text also show on/off |
| 8 | Copy action | On successful clipboard write, exchange real copy icon with real check and announce Copied; handle errors |
| 9 | Loading action | Preserve button width, disable only while running, show semantic progress and verified spinner icon |
| 10 | Filter chip | aria-pressed toggles surface and text; actual list updates, no gratuitous scale |
| 11 | Segmented selector | Native radio group or accessible tabs; use moving indicator with measured width |
| 12 | Accordion trigger | aria-expanded and aria-controls; rotate genuine chevron 180deg; preserve normal focus |
| 13 | Search control | Label input; real search icon; Escape clears only if documented; actual matching results |
| 14 | Gallery navigation | Previous/next native buttons with genuine icons; disabled boundaries or explicit wrap; count announced |
| 15 | Plan selection | Native radio or button with visible selected state and actual billing data; no false recommended badge |

## State-bound scrubber example

~~~jsx
import { useState } from "react";
export function CompareScene({ before, after, beforeAlt, afterAlt }) {
  const [split, setSplit] = useState(50);
  return <div>
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <img src={after} alt={afterAlt} className="absolute inset-0 size-full object-cover" />
      <img src={before} alt={beforeAlt} className="absolute inset-0 size-full object-cover" style={{clipPath: `inset(0 ${100-split}% 0 0)`}} />
      <span aria-hidden="true" className="absolute inset-y-0 w-px bg-white" style={{left: split+"%"}} />
    </div>
    <label className="mt-4 block">Comparison position: {split}%
      <input className="block w-full" type="range" min="0" max="100" value={split} onChange={e=>setSplit(Number(e.target.value))} />
    </label>
  </div>;
}
~~~

Images must be provided and authorized. Use the same crop for a meaningful comparison. Never fake an actual before/after result.
