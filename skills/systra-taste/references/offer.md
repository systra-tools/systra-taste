# Pricing / comparison: design the decision

Choose a structure before styling:
- Aligned ledger rows for comparable plans (one visual scale for price, scan features horizontally on desktop).
- A selector with a live details region when users choose a single configuration.
- An immersive offer world only when relevant imagery belongs to the service. Keep price/terms readable; do not put translucent text over busy photos.
Avoid three equal decorative cards unless the comparison genuinely needs them; no fake recommended plan or savings.

## Original primitive: offer ledger with an actual selected state

~~~jsx
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

export function OfferLedger({ title, description, offers, onSelect }) {
  const [selected,setSelected] = useState(null);
  return (
    <section className="bg-[#f4f2ed] px-5 py-14 text-[#22231f] md:px-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-[15ch] text-[clamp(2.7rem,6vw,6rem)] leading-none tracking-[-.05em]">{title}</h2>
        <p className="mt-5 max-w-xl text-lg">{description}</p>
        <ul className="mt-12 space-y-2" aria-label="Available offers">
          {offers.map(o=>{
            const active=selected===o.id;
            return <li key={o.id} className={"grid items-center gap-5 rounded-lg px-5 py-6 md:grid-cols-[1fr_1.2fr_auto_auto] md:gap-8 md:px-7 "+(active?"bg-[#26322c] text-white":"bg-[#e9e7e0]")}>
              <div><h3 className="text-3xl tracking-tight">{o.name}</h3>{o.note&&<p className="mt-1 text-sm opacity-80">{o.note}</p>}</div>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{o.features.map(f=><li key={f} className="inline-flex items-center gap-2"><HugeiconsIcon icon={Tick02Icon} size={17} strokeWidth={1.5} aria-hidden="true"/>{f}</li>)}</ul>
              <p className="whitespace-nowrap text-4xl tracking-tight">{o.price}<span className="text-sm tracking-normal opacity-80">/{o.unit}</span></p>
              <button type="button" aria-pressed={active} onClick={()=>{setSelected(o.id);onSelect?.(o)}} className={"group inline-flex min-h-12 items-center justify-between gap-3 rounded-lg px-4 "+(active?"bg-white text-neutral-900":"bg-[#26322c] text-white")}>
                {active?"Selected":"Choose "+o.name}
                <HugeiconsIcon icon={active?Tick02Icon:ArrowRight01Icon} size={20} strokeWidth={1.5} aria-hidden="true" className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"/>
              </button>
            </li>;
          })}
        </ul>
        <p className="mt-5 text-sm text-neutral-600" role="status">{selected===null?"No offer selected.":offers.find(o=>o.id===selected)?.name+" selected."}</p>
      </div>
    </section>
  );
}
~~~

Supply real offer IDs, prices including relevant units, features and selection behavior. If selecting opens checkout, preserve actual links and legal information rather than replacing them with mock state. Keep selected text contrast readable, and use only one accent across the list. Use the same font system as the rest of the project, not automatic serif labels.
