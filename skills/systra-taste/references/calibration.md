# Calibration: one brief, three rounds

Brief: homepage for a fictional painting company in Münster ("Farbwerk"). Sections: hero, services, before and after, process, contact. Same images and the same facts in every round. Read this when you are unsure whether a result is good enough.

## Round 1: rejected as generic

- Beige page, Instrument Serif headline, uppercase mono labels ("01 / Scene", "COMPARISON / 03").
- English interface strings on a German site ("Explore the map", "Drag the image or use the slider").
- The strongest image (a paint tin overflowing with orange paint) shrunk into a box below the headline.
- Process as four equal beige cards with olive kickers.
- Copy: "Farbe, die bleibt." "Vom Anruf zur fertigen Wand." "Bereit für frische Wände?"

Why it failed: every rejection on the taste bar, plus a house palette that had nothing to do with the business.

## Round 2: better, still generic

- White page, Albert Sans, full-bleed photo hero with text bottom left, services as one big photo plus a list, process as a numbered line, contact as a solid orange band.
- Copy was still slogan copy: "Farbe, die bleibt." "Erzähl uns von deinem Raum."

Why it was not enough: clean but anonymous. The structure could belong to any trade. The copy sounded written by a tool.

## Round 3: the direction that worked, then too loud

- Hero: white text column, right a grain-gradient panel with white cards that tell a real moment: a phone photo of a hallway, the reply with a fixed price, "Termin steht: Di, 08:00".
- Services: each service with a short spoken line and a gradient card showing a real state (a paint color, scaffolding day 2 of 5, wallpaper delivery, three color samples on the wall).
- Copy rewritten like the owner talks: "Wände streichen wir. Termine nie." "Schick uns ein Foto." "Alte runter, neue drauf. Den Müll nehmen wir mit."
- Problem: every service card had its own hue (lavender, sky, lemon, saffron) plus a vivid orange contact band. Too colorful for a painter. Fix: one apricot family at Calm, one Medium moment in the hero.

## What to take from it

1. The white cards with a real moment are what made it specific. Keep them.
2. Copy changes the perceived quality as much as the layout.
3. Color intensity is a brand decision, not a style default. Decide it in the brand read before building.

## Second brief: hair salon, built straight from the skill

Brief: homepage for a fictional salon "Schnittstelle" in Münster. Brand read: visitors 20 to 45 who want to book online, modern and warm, Medium, sky family taken from the hero photo.

What went wrong on the first pass and why the skill now prevents it:
- The library hero came with an italic serif last line, a kicker and lucide icons. Now: the adapting checklist in component-first.md.
- The team became three equal cards although the taste bar says a strong portrait beats a team grid. Now: step 2 names each section's role before building. Fixed layout: one large portrait, a short statement, two smaller portraits.
- The headline "Morgen um 10 ist noch frei." was fixed text pretending to be live. Now: finish check on live-looking data. New headline: "Haare schneiden, ohne vorher anzurufen."
- On mobile "ab 52 €" broke after the number, and the portraits came before the section heading. Now: finish checks for nowrap and mobile reading order.
- The image search returned a hundred results. Now: filters and a short candidate list.

## The real lesson: three pages, one template

Painter, hair salon and dentist, each built cleanly from the skill, side by side were the same page: text column with a gradient panel as hero, heading left and content right in every section, white floating cards, all headings one size. Each page passed the score on its own; together they looked AI-made. The skill had turned into a template.

The dentist redone with a reference hunt (Framer Marketplace, search "dentist") and a concept:
- Moves taken: fluted glass over the image (Alder), a sentence with an object placed inside it (Dental Point), one giant element (Dentelle).
- Concept: fluted glass is the practice's material; fear gets blurry. Signature: the word "Angst" sits behind fluted glass in a giant headline.
- Every section with its own structure: giant headline in a full-width panel, services as a list of huge words with small spoken lines, the first visit as a rotated paper appointment card, contact as a giant phone number.
- Still no photo and no library: the page works offline because the idea carries it, not the assets.
