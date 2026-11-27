# Service business page: offline parts

Parts, not a page. Used all together in this order they rebuild the AI look of the calibration pages. Start from the reference hunt and concept in [concept.md](concept.md), then pick the parts the concept needs and change them.

Use when no component library is connected, or nothing there fits. Proven on three briefs (painter, hair salon, dental practice). Works without a single photo: the gradient panels with white cards carry the visuals. Needs React, Tailwind, `@hugeicons/react`, `@hugeicons/core-free-icons` and the font: `npm i @fontsource/albert-sans`, then import weights 400, 500 and 600.

Section order that works for most local businesses: hero, services, first visit or process, one statement or proof, contact. Five sections, not twelve.

## Shared pieces

`Grain` and the color families come from [gradients.md](gradients.md). The white card:

~~~jsx
const card = "rounded-xl bg-white text-[#111214] shadow-[0_18px_40px_-24px_rgba(20,30,60,.35)]";
const h2 = "text-[clamp(2.6rem,5vw,5rem)] font-medium leading-[.95] tracking-[-.05em]";
~~~

## Hero: text left, panel with a real moment right

The panel shows the first contact as it really happens: a message, a booking note, a photo the customer sends, the reply, the appointment. Two or three cards, slightly offset on desktop, stacked on mobile.

~~~jsx
<section className="bg-white px-5 pb-16 pt-5 lg:px-10">
  <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
    <div>
      <p className="text-[15px] font-medium text-[#5b6069]">{kind} in {place}</p>
      <h1 className="mt-4 max-w-[11ch] text-[clamp(3rem,6vw,6.2rem)] font-medium leading-[.93] tracking-[-.055em]">{headline}</h1>
      <p className="mt-6 max-w-md text-[18px] leading-relaxed text-[#5b6069]">{promise}</p>
      {/* primary action dark, second action #f3f4f6 */}
    </div>
    <Grain mesh={FAMILY.medium} className="min-h-[500px] rounded-2xl lg:min-h-[min(80svh,740px)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
        <div className={card + " w-full max-w-[330px] p-4 lg:-translate-x-[12%]"}>{customerMessage}</div>
        <div className={card + " w-full max-w-[330px] p-4 lg:translate-x-[12%]"}>{reply}</div>
        <div className="rounded-lg bg-white/70 px-3.5 py-2 text-[13px] font-medium backdrop-blur">{appointment}</div>
      </div>
    </Grain>
  </div>
</section>
~~~

With a strong photo instead: put it in the right column as a tall rounded image and lay one white card on it (next free slot, price, status).

## Services: heading left, spoken lines right

~~~jsx
<div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
  <h2 className={h2}>Was wir machen</h2>
  <ul className="grid gap-10">{services.map(s => <li key={s.t}>
    <p className="text-[clamp(1.5rem,2.2vw,2rem)] font-medium leading-tight tracking-[-.03em]">{s.t}</p>
    <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-[#5b6069]">{s.d}</p></li>)}</ul>
</div>
~~~

Each line says what the customer gets or does not have to worry about. If the page needs more to look at, give each service a gradient card from the same family with a white card showing one real state (a color sample, "day 2 of 5", a price), as a row of four. Same family for all four.

## First visit or process: four sentences

Numbered sentences in large type on a Calm panel, no cards, no arrows. Number in the accent color, sentence in ink. Each step is something the customer does or gets.

## Statement or proof

One sentence from the owner in large type with name and role below. Real reviews with name and context if the client has them. Never invented quotes, stars or counts. German quotes as „…“.

## Contact

Heading and one line left ("Bei Schmerzen ruf an. ..."), right a Calm panel with one white card: phone (nowrap), opening hours, address, one dark button. For trades add WhatsApp next to the phone.

## Before showing

Run `node engine/taste-lint.mjs` and the finish checks in the taste bar. Check that every section still has something to look at; a page of only text blocks fails the composition score.
