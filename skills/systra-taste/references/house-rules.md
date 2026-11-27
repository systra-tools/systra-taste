# House rules and why

Amelie's approved design rules (27.11.2026). Each one comes from her own correction of a real result. Follow them unless the brand or the brief says otherwise. The why matters: when a case is not covered, decide the way the why points.

| Area | Rule | Why |
| --- | --- | --- |
| Type | Hanken Grotesk by default (since 27.11.2026, replaces Albert Sans as the house face); Manrope or Albert Sans when it fits better. Never Inter, Geist, Poppins, Space Grotesk or Playfair Display. | Those faces are what AI-built pages default to. |
| Type | Serif only when it fits the brand; otherwise leave it out. | The italic serif accent was the library default and made every page look the same. |
| Type | Light to regular weights (300 to 400, at most 500). Weights may mix inside one headline. | Thin and regular type looks more premium than bold. |
| Type | Small labels above headings are fine, but not above every section, and in the body face rather than mono. | A label on every block is a template tell. |
| Form | No borders around cards and pills. | Borders make surfaces look like a page builder. |
| Form | Few divider lines. Structure comes from spacing and surfaces. | Many lines make a page fussy. |
| Form | No shadows and no glow. | She finds them ugly, even when subtle. |
| Form | Cards and pills in off-white #F9FAFB. | Her Systra look: a very light, slightly cool grey, almost white. |
| Form | Cards only where they organise information. | Everything in cards is the SaaS kit look. |
| Form | Radius 6 to 12 px. Squircles and large radii only for image frames. | Over-rounded containers look soft and shapeless. |
| Buttons | Buttons 5 to 10 px or underline links, never pills. | Pill buttons read as generic UI kit. |
| Color | White page, two to four grain gradient surfaces like the references: dusky mid-tone worlds (amber, lilac, rose, dusty sky, straw, night) with depth from a light to a deep corner, every surface its own world. No candy colors, no washed-out pastels. See gradients.md. | Four rounds on 27.11.: one family was too little, candy colors looked sick, pastels looked washed out and nothing like the references. |
| Color | Grain on the background, never on the element above it as well. | Double grain looks dirty. |
| Color | No colored blobs on white or dark grounds. | Decoration without a job. |
| Color | Brown, terracotta and beige rarely, never as a default. | They look dated. |
| Image | No shadows, dark overlays or glass blur behind text. Pick a photo with a calm area that carries the text, or change the text color. | She finds all three ugly (27.11.2026, replaces the glass-blur rule from 09.11.). |
| Image | Images in a draft are placeholders; the real photos come from the client. With the Systra Tools MCP, use fitting placeholders from its image library. Without it, a calm grain panel with a note naming the photo that belongs there. Never generate AI images. | Images decide a lot at the end, and invented ones are not the client's. |
| Icons | Hugeicons with a thin stroke (strokeWidth 1.25 to 1.5). Avoid Lucide; convert with engine/icons.mjs. | AI-built pages are recognisable by Lucide. |
| Text | No dashes as punctuation, "Button" never "Knopf", no slogan formulas ("Farbe, die bleibt"), copy as the owner would say it. | AI copy makes a good layout feel generic. |

`node engine/taste-lint.mjs` checks the rules that can be checked in code: AI faces, serif, heavy weights, shadows, borders on rounded elements, pill buttons, Lucide imports, neon, washed-out or look-alike gradients, and the copy patterns.
