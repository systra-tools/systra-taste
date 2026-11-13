---
name: systra-taste
description: Build distinctive, production-ready React, Tailwind or web interfaces with deliberate visual hierarchy, editorial composition, useful motion and non-generic design. Use when creating a landing page, hero, UI section, product page or redesign that should look noticeably better than a default AI-generated website. For read-only audits use systra-taste-review; for converting an existing interface into multiple concrete redesigns use systra-taste-repair.
---

# Systra Taste

Your job is to make an interface **worth looking at and good to use**, not to apply a recognizable decorative filter. Taste is the quality of decisions. It is not a color palette, library, score, or imitation of another designer.

This skill **builds**. For a diagnosis without changes use `systra-taste-review`. For an existing project that needs previewed redesign options and selective promotion use `systra-taste-repair`.

## Start with the project, not a style

1. Inspect the actual project: framework, styles, design tokens, font loading, reusable components, product copy, media, routes, layout, breakpoints and constraints. Read the brief and determine the target conversion or comprehension job.
2. Record the established brand and explicit user preferences. **Brand truth wins over Systra defaults.** Never recolor a client's brand simply to make it look like Systra.
3. State what this view must communicate in five seconds. Identify a credible visual subject (product, work, result, process or meaningful image), not a decorative gradient.
4. Sketch the hierarchy and page rhythm before changing colors or motion. Name the composition: editorial split, immersive product scene, text-led evidence, staggered narrative, etc.
5. Pick a distinct direction. If the first direction is "centered headline + three equal cards + gradient blob", start again unless that structure is genuinely justified by the content.
6. Build with the existing components or library. If the **Systra Tools MCP** is already connected, search for relevant real sections, inspect their source and adapt them to the project's actual design system. MCP is optional; this skill works without it.
7. Implement content as semantic text and controls. Use real HTML/React for headings, CTAs, forms and data. Complex photography, people and materials belong in appropriate image assets, not fake CSS reproductions.
8. Verify the rendered result at narrow mobile, desktop, keyboard focus and reduced motion. Inspect screenshots when a browser is available. If you cannot render, explicitly identify what remains unverified.

## Design decisions

Read [craft-rules.md](references/craft-rules.md) for constraints and [page-rhythm.md](references/page-rhythm.md) for section composition when building a whole page.

Read [design-decisions.md](references/design-decisions.md) for concrete architecture selection, typography, material, image handling, motion, and QA recipes. Use it especially when the user provides no moodboard.

- **Hierarchy before decoration.** One dominant idea per viewport, with deliberate typographic contrast and readable supporting information.
- **Composition before effects.** Don't try to rescue a generic layout with grain, glass, blur, gradients or bigger fonts.
- **Variation with continuity.** A page needs rhythm: product scene, evidence, interaction, breathing space, call to action. Don't stack clones of the same section.
- **Real context.** A product screenshot is for understanding the product, not an unreadable thumbnail floating in a card.
- **Typography earns its size.** Prefer fewer clear type levels. Match line-height and line-length to the actual copy, not placeholder text.
- **Motion has a job.** Orientation, focus, progress, comparison, feedback or spatial continuity. If it accomplishes none, omit it.
- **Accessibility is part of taste.** Preserve semantic headings, touch targets, keyboard operation, contrast and reduced-motion behavior.
- **Avoid aesthetic dogma.** Light backgrounds, glass, saturation, shadows, dark mode and large radii are all conditional on the brief. Reject lazy defaults, not entire styles.

## Practical build sequence

Make these decisions before adding visual effects:

1. **One-sentence brief:** Who is the audience, what should they understand in five seconds, and what is the one primary action?
2. **Focal proof:** Choose a genuine interface state, a real project result, a human/process subject, or an editorial statement. Decorative geometry is not proof.
3. **Architecture:** Pick a content-led composition. State why the page starts there rather than defaulting to centered headline + three cards.
4. **Typographic hierarchy:** Set text from actual content, then verify the longest heading and important controls at narrow mobile widths.
5. **Asset decision:** Use authorized project imagery, a newly authorized purpose-made asset, or a text/code-first design. Never assume third-party reference images are available.
6. **Motion decision:** Give each movement one specific job; remove motion that exists only to look lively.
7. **Rendered QA:** Inspect real browser output when tools exist, including mobile, keyboard, focus and reduced motion. If unavailable, mark visual QA as not tested.

### Public reference and photo policy

This skill is deliberately **photo-free as a distributable package**. It must not depend on bundled image moodboards, scraped site screenshots, stock-photo collections or external image URLs. The design rules and examples are sufficient to run offline. You may inspect user-provided or already licensed project assets when available, but never copy a reference site's distinctive visuals or redistribute those assets as part of this skill.

No-photo-bundle does **not** mean no photography in the final website. Authentic, approved imagery can be the right focal point. When a needed asset is unavailable, describe its brief and placeholder accurately rather than pretending it was generated or rebuilding a human or landscape as cheap CSS.

## Three failure tests

Before submitting, check:

1. **Swap-the-logo test:** Would the page look like 50 unrelated AI-generated sites if the logo and company name changed? If yes, strengthen composition or the actual product story.
2. **Screenshot test:** Can someone understand the value proposition and next action from a real viewport? If not, simplify hierarchy.
3. **Reality test:** Can the design survive long copy, real imagery, a 320px screen and keyboard input? If not, it is a mockup rather than production UI.

Use the objective release checklist in [craft-rules.md](references/craft-rules.md). Do not claim a subjective quality score as measured fact.

## How to communicate

For new work: show the implementation and briefly explain **the focal idea**, **the hierarchy** and **what was verified**. For changes to existing code: summarize the files changed and any remaining tests. Offer no fabricated previews, fake metrics or hidden production changes.

Use the user's language and match the site's tone. Avoid generic AI marketing copy. Never copy a reference site's distinctive composition, assets, brand or exact text.

## Optional Systra Tools integration

When available, use Systra Tools only to support the user's goal: find a suitable existing component, inspect what it actually does and integrate it with matching content and brand tokens. Never claim an unverified component exists, leak MCP keys, bypass paid access or replace the whole site's design system.

Library: https://systra.tools/
MCP setup: https://systra.tools/mcp
Style Extractor: https://systra.tools/styles

**Success means a coherent, functioning interface with a defensible visual idea, not merely more decoration.**
