# Section router: load less, build sooner

Budget: SKILL.md + [taste-bar.md](taste-bar.md) + this router + ONE matching recipe per distinct job. For a whole page, start with at most three modules initially and reuse decisions. Do not concatenate every reference.

## Source real sections first

When the Systra Tools MCP is connected, call search_components with job plus industry plus mood, in English: "hero for a painting company", "testimonials for a car workshop", "contact form for a clinic". The library has industry-specific sections; an abstract query ("editorial image-led hero") throws that away. Shortlist 2 or 3, read their source, adapt one. Use list_styles and get_component_styled when a brand style exists. For a whole page, call list_recipes with the industry first; a matching recipe gives a proven section order. Then apply the taste bar.

Images: always pass filters to search_images (use, tone, people, text_space) so the result stays short, take candidates from the first ten, and look at the chosen image before building around it. The library is AI-generated, so people in it are placeholders until the client sends real photos.

| Job | MCP query starts with | Local recipe |
| --- | --- | --- |
| Hero / brand story | "hero for a [industry]" | [hero.md](hero.md) |
| Services / features | "services for a [industry]" | [editorial.md](editorial.md) |
| Proof / reviews / projects | "testimonials", "before after", "project gallery" | [editorial.md](editorial.md) |
| About / team | "about section for a [industry]" | [editorial.md](editorial.md) |
| Process / workflow | "process steps for a [industry]" | [process.md](process.md) |
| Pricing / packages | "pricing for a [industry]" | [offer.md](offer.md) |
| Contact / CTA / footer | "contact form for a [industry]", "cta" | [hero.md](hero.md) |
| Dense UI / forms | the actual component type | [visual-signature.md](visual-signature.md) |

The local recipes and the five components in ../components are fallbacks for offline use. They are not the Systra look; re-theme them to the brand.

## Optional, only for a concrete open problem

- [design-dna.md](design-dna.md), [reference-index.md](reference-index.md): directions and discovery hints.
- [art-direction.md](art-direction.md), [design-decisions.md](design-decisions.md), [craft-rules.md](craft-rules.md): composition and type depth.
- [page-rhythm.md](page-rhythm.md): full-page sequencing.
- [visual-recipes.md](visual-recipes.md): older generic examples.
- [interaction-atlas.md](interaction-atlas.md): one motion or control pattern.
- [motion-patterns.md](motion-patterns.md), [lenis-gsap.md](lenis-gsap.md): motion implementation.
- [release-gates.md](release-gates.md): expanded QA for complex or failing work.

The taste bar outranks every older guide. If an older file suggests a serif accent, a mono kicker or a muted earthy palette as a default, ignore it unless the brand asks for it.
