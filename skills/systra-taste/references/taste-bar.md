# Taste bar: what passes and what gets rebuilt

Read this before every design task. It is the quality bar, not a style guide. A result can pass every functional gate and still fail here. For a worked example of rejected and accepted rounds, see [calibration.md](calibration.md).

## Hard rejections

Rebuild the architecture (not the colors) when any of these is visible:

- Headline, paragraph, two buttons and a centered mockup or three equal cards. The default SaaS skeleton.
- The same left-copy, right-graphic, bottom-KPI-strip layout in every alternative.
- Flat CSS circles, concentric rings, gradient blobs, wireframes or floating cards acting as the main visual.
- Invented dashboards, pseudo-random metrics, fake avatars, stars, logos or quotes.
- A random italic serif word inside a sans headline.
- An uppercase mono label with a dot or number above every heading ("SIGNAL / 01", "STAY SELECTOR").
- Beige, olive, khaki or acid-lime palettes chosen because they look "designed", not because of the brand.
- Several hue families on one page, or a row of cards where every card has its own color. Color louder than the business.
- Black plus neon as an automatic tech look; blue-purple glow as an automatic AI look.
- Borders around every card, pill or button; drop shadows; many divider lines; glass on an empty background.
- Text colliding with an image or object, or copy crossing a color transition.
- Photography, people or 3D faked with CSS shapes and gradients.
- Small headline, long paragraph. Walls of text on a slide-like section.
- A page made of identical rounded containers with only the content changing.

## Score before showing

Score the rendered screenshot, not the code. 0 to 2 points each:

1. **Composition:** one clear focal subject, deliberate grid, tension through scale or crop.
2. **Typography:** large, controlled, two or three intentional lines, clean breaks, one family used well.
3. **Subject quality:** the image, product state or object is credible and belongs to this business.
4. **Fit:** it suits the audience, industry and brand; the logo could not be swapped onto another site.
5. **Finish:** spacing, alignment, contrast, mobile recomposition and states feel resolved.

Need 9 of 10 and no zero. Otherwise discard the skeleton and try the other composition idea. Polishing a generic layout with grain, glass, glow or gradients does not count as a fix.

Final question: would this still feel specifically designed with every gradient, blur, shadow and animation removed? If not, the architecture is the problem.

## Finish checks

After the score, before showing:

- Live-looking data (next free slot, stock, opening status, prices) is either wired to a real source or written so it stays true without one. "Morgen um 10 ist noch frei" as fixed text is a lie on the next day.
- Prices, units, phone numbers and dates never break across lines ("ab 52 €" stays together): use whitespace-nowrap.
- On mobile the heading of a section comes before its media, and the reading order still makes sense.
- People shown as team or customers are real or clearly marked as placeholders for the client's own photos.
- Every button and link goes somewhere, and 320 px stays readable.

## Alternatives

When asked for options, vary all five: architecture, focal subject, copy placement, proof mechanism, background behavior. A palette swap or reordered cards is the same design.

## Section roles for service businesses

Most Systra work is for local and service businesses (trades, workshops, coaches, studios, practices). Design the job of each section:

- **Hero:** the promise in a few words, one real subject (the team at work, the finished result, the place), one primary action. Phone or WhatsApp often beats a form.
- **Services:** show what the customer gets, ideally with real work photos. Vary module sizes; one lead service can dominate.
- **Proof:** real reviews with name and context, before and after, finished projects. Integrate it into the composition, not as a strip of boxes.
- **About:** people and a belief. A strong portrait or one statement beats a team grid.
- **Process:** a real sequence (call, visit, offer, done) as a line, timeline or numbered flow, not three equal cards with arrows.
- **Contact:** form, response time, channels and a contextual image as one calm composition.
- **CTA:** one next step. Do not repeat the hero in miniature.

Alternate dense and calm, photographic and typographic, full-bleed and contained.

## Images

Order of preference: approved project photo, approved asset from the Systra Tools image library when it is connected, a generated asset when the user allows it, then a grain-gradient panel with white cards showing a real moment of the business (works without any photo). Code-native drawings only for real UI, charts and diagrams.

When an image is missing, deliver an English prompt, filename, aspect ratio, desktop and mobile crop, text-safe area and alt-text direction, and reference it cleanly in code. Prompt shape:

`[subject and action], [environment], [material], [lighting], [camera and lens], [composition and crop], [palette], clean text-safe area on [side], believable scale and contact, no typography, no logos, no UI, no watermark, no generic AI gloss`

Images may be bold, surprising and colorful when the brand allows it. Quiet stock with a laptop and a plant is rarely the best subject.

## Color

Default color move: grain gradients from one brand family, see [gradients.md](gradients.md). The intensity follows the brand read: a painter or a dental practice gets Calm, a festival gets Vivid. A page without any color moment usually reads generic; a page with several hues or with every section in color reads loud. Aim for one to three gradient moments, the rest white, and only one moment above the page's intensity level.

## Copy

AI copy is the fastest way to make a good layout feel generic. Rewrite any line that matches these patterns:

- Slogan built as noun, comma, relative clause: "Farbe, die bleibt." "Design, das wirkt." "Websites, die verkaufen."
- Section invitations nobody says out loud: "Bereit für frische Wände?" "Erzähl uns von deinem Raum." "Lass uns gemeinsam ..."
- "Vom X zum Y", "Mehr als nur X", "Nicht nur X, sondern Y", "Das Problem ist nicht X. Es ist Y."
- Three adjectives or three promises in a row ("sauber, pünktlich, zuverlässig").
- Abstract nouns instead of things: Qualität, Leidenschaft, Lösungen, Erlebnis, Mehrwert, Präsenz.
- A headline that would work for any company in the industry.

Write instead like the owner on the phone: concrete things, real actions, short sentences, one idea per line. A small pun is welcome if it is about the actual service and not cringe.

| Instead of | Write |
| --- | --- |
| Farbe, die bleibt. | Wände streichen wir. Termine nie. |
| Erzähl uns von deinem Raum. | Schick uns ein Foto. |
| Vom Anruf zur fertigen Wand. | So läuft's |
| Vorher, nachher. | Drei Tage später |
| Was wir für dich streichen. | Was wir machen |

Test every headline: would a real person in this trade say it to a customer? Could a competitor paste it onto their site unchanged? If yes to the second, rewrite.

### Basics


Short, concrete, human. Lead with the customer's benefit. No buzzwords ("innovative", "ganzheitlich", "maßgeschneidert"), no filler, no em dashes. Numbered lists with digits. Button labels say what happens ("Termin anfragen", not "Mehr erfahren").
