# Hero / scene: lead with a subject

Choose one of three visual structures, according to content:
- Immersive scene: approved large image with a meaningful point of interaction. Text sits in its negative space or over a controlled gradient, not on a random glass card.
- Editorial canvas: oversized unboxed text, one decisive crop and quiet action; different image and type proportions, not a default 50/50 split.
- Working specimen: a real product task in a large readable region; headline along the edge, no fake dashboard or decorative device.

Typography: for a technical scene try Hanken Grotesk with short IBM Plex Mono labels. For a sensory brand use Instrument Serif as the full display face if available, with restrained sans body; for a contemporary product use Albert Sans or Figtree alone with deliberate weight and width. Do not automatically put the last word in italic serif. Test actual wraps and contrast.

## Original primitive: scene with real toggle and marker placement

Provide an authorized image, stable points in percentages and content appropriate to the actual scene. Mark fictional locations illustrative. Use object-contain to keep overlay coordinates consistent with the image; the wrapper uses the supplied image aspect ratio. For a deliberate crop, map points to that crop instead of guessing coordinates.

~~~jsx
import { useId, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Location01Icon } from "@hugeicons/core-free-icons";

export function SceneMarkers({ image, alt, ratio = "16 / 9", points, title, description }) {
  const [open, setOpen] = useState(false);
  const sceneId = useId();
  return (
    <section className="bg-[#f1f0eb] text-[#20221d] px-5 py-12 md:px-16 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <h1 className="max-w-[14ch] text-[clamp(2.8rem,6vw,6.5rem)] leading-[.98] tracking-[-.055em]">{title}</h1>
          <div className="max-w-sm"><p className="mb-5 leading-relaxed">{description}</p>
            <button type="button" aria-pressed={open} aria-controls={sceneId} onClick={() => setOpen(!open)}
              className="group inline-flex min-h-12 items-center gap-3 rounded-lg bg-[#20221d] px-4 text-white focus-visible:outline focus-visible:outline-offset-4">
              {open ? "Hide markers" : "Explore the map"}
              <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"/>
            </button>
          </div>
        </div>
        <figure id={sceneId} className="relative mt-9 overflow-hidden rounded-xl bg-neutral-800" style={{aspectRatio:ratio}}>
          <img src={image} alt={alt} className="size-full object-contain"/>
          {open && points.map(p => (
            <div key={p.label} className="absolute flex max-w-[40%] -translate-x-1/2 items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-neutral-900 md:text-sm" style={{left:p.x+"%",top:p.y+"%"}}>
              <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.5} aria-hidden="true" className="shrink-0"/><span>{p.label}</span>
            </div>
          ))}
        </figure>
        <p className="mt-3 text-sm text-neutral-600" role="status">{open ? points.map(p=>p.label).join(", ") : "Illustrative terrain"}</p>
      </div>
    </section>
  );
}
~~~

This is one primitive, not a mandatory layout. Keep labels inside the frame at mobile sizes, ensure image ratio matches, and preserve the requested content and action. For immersive work, the image can move behind text if contrast and marker overlap remain safe. Do not add a second action unless needed.
