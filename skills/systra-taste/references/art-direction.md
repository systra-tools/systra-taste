# Art direction before interface styling

The goal is a distinctive, useful composition, not a house template. Quality signals: editorial hierarchy, strong image crops, legible working product, coherent rhythm, careful interaction, and one memorable detail. Do not copy a reference site's exact composition or assets.

## Three directions, one choice

Before building a substantial section, sketch two directions in 1–2 lines each. Change the actual architecture, not the palette.

- **Editorial:** left-anchored statement, asymmetric columns, deliberate negative space, a meaningful small annotation and a single hero visual.
- **Immersive:** a large product or approved photographic scene; text positioned at a clear edge or in negative space. Use a deliberate crop and a quiet reading area.
- **Demonstrative:** one readable interactive transformation, specimen or comparison with an intentional sequence and a stable layout.

These are starting points, not three templates to reuse everywhere. Decide based on the content and audience. Write down the dominant element, the secondary element, what is removed, and why the rejected options were weaker. A screenshot should still have a specific identity after hiding the logo.

## Typography is the design

Check the actual installed or authorized fonts. Do not silently download third-party fonts or substitute a visually different font without noting it.

For greenfield work, compare:
- Systra default: Albert Sans alone, carried by scale, weight and spacing. Alternatives: Hanken Grotesk or Figtree; display 56–88 px on a wide desktop, body 16–18 px, compact heading line-height 0.98–1.10, neutral body line-height 1.5–1.65.
- Editorial contrast: only when the brand or content asks for it. Then one serif for the whole display level, never a single italic word inside a sans headline.
- Technical: a confident sans headline and IBM Plex Mono for genuinely technical metadata, never every small label.

Use existing brand typography first. Numbers are starting ranges, not a rule for a narrow section. Use responsive clamp, avoid widow words, inspect the optical edge of type, and tune tracking to the font (often -0.035em to -0.055em for large sans headlines, near normal for body). Do not put a badge above every heading. Avoid a global centered text treatment. Prefer an intentional 2–3 line headline over a tiny single line or a wall of large text. Use consistent casing, real punctuation, and precise CTA verbs.

## Color and material

Select one palette with a reason. Systra default: clean white, near-black ink and one clear accent taken from the brand. Other options when the brand supports them: cool mineral whites + graphite + cobalt; rich dark neutral + one luminous accent; or the client palette. Warm paper, beige, olive and terracotta tones only when the brand clearly calls for them. Establish readable roles for text, muted text, surface and primary action. Use one accent hierarchy instead of random colored badges. A gradient must reinforce the focal subject, not fill unused space. For an approved image, sample the palette from the image and preserve legibility. A flat, monochrome design is valid only if typography, structure and content carry it.

Use depth from crop, layering, scale, intentional overlap, section transitions and contrast rather than default drop shadows or decorative frames. No ornamental dashboard mockups, floating pills, or repeated boxed features just to occupy space. Avoid endless bento and evenly weighted columns unless the content requires direct comparison.

## Spacing and detail

At desktop use a consistent content grid, commonly 12 columns with a deliberate 64–96 px outer gutter on wide screens, or a project container. Let one focal element cross a grid boundary only when justified. Use coherent 8 px-based spacing, then optically adjust. Mobile is a recomposition, not a shrunk desktop. Use 20–24 px side gutters where space allows. Prefer whitespace over lines; functional separators are allowed.

Buttons: readable 40–48 px target height (or adequate touch target), balanced horizontal inset, subtle 6–12 px radius, genuine Hugeicons for any functional arrow. One small hover translation or clipped icon exchange, not a huge color/scale jump. Keep focus visible and disable nonessential movement under reduced motion.

## Design review

Inspect the rendered image without reading the code. Identify the first thing seen, then the second. Check if the product/scene is recognizable, typography has character, and the layout could be exchanged with an unrelated site. If the answer is generic, change the architecture or focal subject before adjusting color. Re-render. See release-gates.md.
