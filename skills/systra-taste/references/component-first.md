# Adapt real components first

For a new substantial section, prioritize a matching existing project component, then a matching authorized Systra Tools MCP section, then the original bundled source below. Use the existing project's architecture, tokens and dependencies. Do not use a component solely because it exists.

## Systra Tools MCP (optional)

The public Systra UI plugin documents these tools: search_components, get_component, list_recipes, get_recipe, list_styles, get_component_styled and search_images. When the MCP is connected as a tool in the current session, use those tools directly; they carry the user's real access level. The engine CLI (engine/mcp.mjs) is only a fallback without a connector and sees free components only unless a key is supplied. Use actual returned results, not guessed identifiers. Search with section job plus industry plus mood, for example "pricing for a hair salon", never with an abstract design phrase alone. Inspect the returned preview or source where permitted, retain the visual architecture and working interactions, then adapt copy, assets, colors, type and layout to the actual project. Whole-page recipes can establish consistent rhythm. Confirm dependencies before installation; never bypass access restrictions, retrieve protected source through another route, or bundle premium material. If unavailable or unsuitable, continue offline without a claim that MCP was used.

## Adapting library source

Library sections often ship with choices the taste bar rejects. Before showing anything, go through this list:

1. Replace an italic serif accent or a serif display line with the project face (Albert Sans by default). Keep the line breaks.
2. Delete uppercase kickers and eyebrow labels unless the content needs them.
3. Delete invented proof: avatar stacks, star rows, "1,400 homes" style numbers, sample quotes. Put back only what the client really has.
4. Swap lucide-react for Hugeicons with `node engine/icons.mjs` (see integration-pipeline.md) or by hand with verified exports.
5. Re-theme colors to the brand family and intensity from the brand read. Remove dark overlays that only exist for the sample photo.
6. Replace every sample text with copy written by the copy rules, in the project language.
7. Keep the architecture, the motion and the working interactions. That is what the library is for.

## Original fallback components

Copy the selected file, shared.jsx and taste.css from ../components/ into the same project directory. These are real standalone React components with scoped CSS, compatible with React/Tailwind projects. They are original and MIT-licensed in this skill, not sourced from the premium library. They use React and verified Hugeicons packages; existing authorized font assets are optional. Override scoped tokens (--paper, --ink, --muted, --surface, --accent, --display, --body) and adapt all sample content. SceneHero, StaySelector and ImageCompare take a labels prop for every interface string; pass labels in the project language, for example labels={{choose:"Auswählen",selection:"Deine Auswahl"}}. Do not invent client claims or silently change required behavior.

| Job | Actual source | Use |
| --- | --- | --- |
| Image-led editorial hero | ../components/scene-hero.jsx | SceneHero: approved image, title, copy, actual points and matching image ratio |
| Data transformation | ../components/signal-trace.jsx | SignalTrace: finite samples; actual min-max transform, separate scales, inspect sample |
| Geometry transformation | ../components/contour-smooth.jsx | ContourSmooth: finite polygon points; corner cutting with user-controlled strength |
| Visual comparison | ../components/image-compare.jsx | ImageCompare: two registered views of same subject, meaningful labels and ratio |
| Pricing / booking | ../components/stay-selector.jsx | StaySelector: real offer IDs, prices, units, features and optional onSelect callback |

Keep shared.jsx for genuine Hugeicons and clipped button-icon exchange. Keep taste.css or translate the chosen styles to project tokens without changing behavior. These five components are starting points, not five mandatory layouts; never force identical heading composition across a page. Treat a sample geometric polygon as illustrative. Use approved images; no image assets ship. For image comparison the caller supplies aligned images with equivalent crops; the slider changes actual visible coverage.

## Verification

Render initial and active states at desktop and mobile (including 320px). Inspect screenshots for overlapping headings and content, clipping, contrast and crop. Test keyboard operation, focus retention after state changes, actual drag handles by pointer and touch, reduced motion, real state, numerical scales and every CTA. A decorative handle must not masquerade as an operable control. For charts, verify domain, clamp coordinates and confirm values; do not use raw values as percentages. Reveal real coordinates rather than animating through misleading intermediate data. Verify interruption/reset, pointer and touch dragging, visible focus retention, and reduced motion. A working build alone is insufficient. For cases with a better existing component, adapt that rather than blindly reproducing the sample. Report what was used and what remains untested.
