# Editorial / proof / gallery

Start from actual evidence: a real quote, a project photograph, a result, or an approved statement. No made-up customers, avatars, metrics, signatures or logos. Illustrative examples must be clearly labeled.

Three useful structures:
- A single quote as a typographic event with attribution immediately below. Use one large face rather than automatically mixing sans and italic serif. A supporting image is only useful if it actually relates to the quote.
- A lead visual with a narrow indexed list of alternate images; clicking changes the actual crop and caption, not merely the border color.
- An image-led story with a compact text column and one small factual annotation. Keep the next section visually different.

## Original primitive: selected image and caption

~~~jsx
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

export function EditorialGallery({ title, items }) {
  const [index,setIndex]=useState(0);
  const item=items[index];
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:px-16 md:py-24">
      <h2 className="max-w-[18ch] text-[clamp(2.5rem,5vw,5rem)] leading-none tracking-[-.045em]">{title}</h2>
      <div className="mt-10 grid gap-8 md:grid-cols-[1.7fr_1fr]">
        <figure><img src={item.src} alt={item.alt} className="aspect-[4/3] w-full rounded-xl object-cover"/><figcaption className="mt-3 text-sm">{item.caption}</figcaption></figure>
        <div className="flex flex-col justify-end gap-2">
          {items.map((entry,i)=><button key={entry.id} type="button" aria-pressed={index===i} onClick={()=>setIndex(i)}
            className={"flex min-h-12 items-center justify-between gap-4 rounded-lg px-4 text-left "+(index===i?"bg-neutral-900 text-white":"bg-neutral-100 text-neutral-900")}>
              <span>{entry.label}</span><HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true"/>
            </button>)}
        </div>
      </div>
      <p role="status" className="sr-only">{item.label} selected.</p>
    </section>
  );
}
~~~

Supply nonempty authorized items with unique IDs and meaningful captions. For editorial statements without imagery, make the typography the subject and avoid empty placeholder boxes. For a gallery with many entries, ensure all items remain keyboard accessible.
