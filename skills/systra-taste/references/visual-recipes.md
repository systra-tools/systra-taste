# Original visual recipes (code-first)

Use these as practical ingredients, not a layout library. Adapt to the brief and existing design system. All examples are original and illustrative; no external images or client evidence are bundled. For a real build inspect installed packages and exports, render, and verify functionality.

## 1. Hero: an editorial statement next to a readable product specimen

Instead of a 50/50 headline/dashboard pair, create a 12-column hierarchy: statement across columns 1 to 8, a short note on 10 to 12, then a full-width working specimen offset by a grid unit. Allow the headline to set the visual rhythm. A product specimen must answer one task, not be a decorative fake dashboard. If the product is photography-led, substitute an approved large image with a text-safe crop and a quiet area.

~~~jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function EditorialHero({ specimen, href = "#demo" }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 lg:px-20 lg:py-28">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="max-w-[12ch] text-[clamp(3rem,7vw,7rem)] leading-[.99] tracking-[-.045em] font-medium lg:col-span-8">
          From first draft to final cut.
        </h1>
        <div className="max-w-sm lg:col-span-3 lg:col-start-10">
          <p className="mb-6 text-base leading-relaxed text-neutral-600">
            Review the work, make a change and see the result in context.
          </p>
          <a href={href} className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-neutral-900 px-4 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Try the workflow
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5}
              aria-hidden="true" className="transition-transform duration-300 motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
      <div id="demo" className="mt-12 min-w-0 bg-neutral-100 p-4 rounded-xl lg:ml-[8.33%] lg:mt-16 lg:p-8">
        {specimen}
      </div>
    </section>
  );
}
~~~

The caller supplies a real working specimen and target. Do not ship an empty specimen, invented dashboard, or misleading proof. Change headline, fonts and palette for the product.

## 2. Workflow: a visible transformation, not three icon cards

For a workflow that converts an input to an output, put the actual input and output in one continuous scene. Use a small node or a moving signal only to explain the handoff. On desktop use three regions with a narrow transition track; on mobile stack them. A toggle changes the actual example and shows its state. An illustrative transformation must be labeled as such.

~~~jsx
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

export function TextTransform() {
  const [clean, setClean] = useState(false);
  const original = "  launch   checklist  ";
  const result = clean ? original.trim().replace(/\s+/g, " ") : original;
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="max-w-[18ch] text-4xl font-medium tracking-tight md:text-6xl">See what changes.</h2>
      <p className="mt-4 text-neutral-600">An example of normalizing whitespace.</p>
      <div className="mt-12 grid items-stretch gap-4 rounded-xl bg-neutral-100 p-5 md:grid-cols-[1fr_80px_1fr] md:p-10">
        <div className="min-w-0 bg-white rounded-lg p-6">
          <p className="mb-8 text-sm text-neutral-600">Input</p>
          <code className="block whitespace-pre-wrap break-words">{original}</code>
        </div>
        <div className="flex items-center justify-center gap-1 text-neutral-600" aria-hidden="true">
          <span className={clean ? "h-2 w-2 rounded-full bg-lime-600" : "h-2 w-2 rounded-full bg-neutral-400"} />
          <span className="h-px w-4 bg-current" />
          <HugeiconsIcon icon={ArrowRight01Icon} size={22} strokeWidth={1.5} className="rotate-90 md:rotate-0" />
        </div>
        <div className="min-w-0 bg-white rounded-lg p-6">
          <div className="mb-8 flex items-center justify-between text-sm text-neutral-600">
            Output {clean && <HugeiconsIcon icon={Tick02Icon} size={18} strokeWidth={1.5} aria-hidden="true" />}
          </div>
          <code aria-live="polite" className="block whitespace-pre-wrap break-words">{result}</code>
        </div>
      </div>
      <button type="button" aria-pressed={clean} onClick={() => setClean(v => !v)}
        className="mt-5 min-h-12 rounded-lg bg-neutral-900 px-5 text-white focus-visible:outline focus-visible:outline-offset-4">
        {clean ? "Reset example" : "Normalize whitespace"}
      </button>
    </section>
  );
}
~~~

For more visual process scenes: a line with variable-size nodes can indicate stages, density, or progress; it must correspond to actual state, not random decoration. Keep text and controls outside decorative layers. Animate only the handoff, with 240 to 480 ms transitions and a static reduced-motion state. Avoid endless particles or forced scroll.

## 3. Pricing: decision-led architecture

When plans are substantially different, use a large featured offer next to a compact alternative and a separate comparison below. No arbitrary fake best-value badges, invented savings or extra plans. If plans truly require equal comparison, use aligned columns or a semantic table instead.

~~~jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

export function PricingOffer({ primary, secondary }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="max-w-[17ch] text-4xl font-medium tracking-tight md:text-6xl">Choose what you need.</h2>
      <div className="mt-12 grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
        <article className="rounded-xl bg-neutral-900 p-7 text-white md:p-10">
          <h3 className="text-xl font-medium">{primary.name}</h3>
          <p className="my-5 text-5xl tracking-tight md:text-7xl">{primary.price}</p>
          <p className="text-neutral-300">{primary.description}</p>
          <ul className="my-8 grid gap-3">
            {primary.features.map(f => (
              <li key={f} className="flex items-start gap-3">
                <HugeiconsIcon icon={Tick02Icon} size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />{f}
              </li>
            ))}
          </ul>
          <a href={primary.href} className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-white px-5 text-neutral-900 focus-visible:outline focus-visible:outline-offset-4">
            {primary.cta}
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true" className="transition-transform motion-safe:group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </article>
        <article className="px-2 md:px-8">
          <h3 className="text-xl font-medium">{secondary.name}</h3>
          <p className="my-4 text-4xl tracking-tight">{secondary.price}</p>
          <p className="text-neutral-600">{secondary.description}</p>
          <ul className="my-6 grid gap-3">
            {secondary.features.map(f => <li key={f} className="flex gap-3"><HugeiconsIcon icon={Tick02Icon} size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0" />{f}</li>)}
          </ul>
          <a href={secondary.href} className="inline-flex min-h-12 items-center gap-3 text-neutral-900 underline underline-offset-4 focus-visible:outline focus-visible:outline-offset-4">
            {secondary.cta}<HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
~~~

Pass actual plan names, full price/billing unit, descriptions, features, and working links. Do not favor a plan without a business or audience reason. Avoid hiding important limitations in a hover tooltip.

## 4. Visual ingredients

- **Image fade:** when an approved visual blends into a reading area, use a local mask-image: linear-gradient(to bottom, #000 75%, transparent 100%) on the decorative image only. Never fade text or interactive controls. Check mobile crops.
- **Layered composition:** align overlapping decorative media with the grid; use z-index and isolation rather than shadows. Keep the accessible reading order natural.
- **Grain:** optional low-opacity procedural texture over a large decorative surface, pointer-events none. Check contrast and avoid adding noisy texture to text or dense UI.
- **Color:** an accent gradient can be a deliberate image or specimen material; keep solid readable actions and neutral breathing room. Never add glow as a generic polish step.
- **Clipped entrance:** a short transform from 12 to 20px within a clipped decorative wrapper with opacity; use a shared easing such as cubic-bezier(.22,1,.36,1). Do not clip focus rings. Render content immediately with JS disabled or reduced motion.
- **Button icon exchange:** use two genuine instances of the same icon inside a 20px clipped window; move one out and the other in over 250 to 350ms. Keep the label stable; use an aria-hidden wrapper and disable transitions under reduced motion. A simple 4px translation is often enough.
- **Scroll:** use a single meaningful state progression or scene transition. Read motion-patterns.md and lenis-gsap.md when appropriate. Do not pin on mobile if it compromises reading; never animate every paragraph.

These examples are recipes, not certified designs. Compile and render the actual adaptation. Do not present them as screenshots or verified production sections without testing.
