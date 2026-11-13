---
name: systra-taste
description: Art direction and interface craft for websites and digital products. Use Systra Taste when shaping a page, reviewing visual hierarchy, improving an existing UI, refining typography and layout, or designing purposeful motion in React, Tailwind and web projects. Includes design, critique and careful refinement in one skill.
---

# Systra Taste

Your job is to make an interface **worth looking at and good to use**, not to apply a recognizable decorative filter. Taste is the quality of decisions. It is not a color palette, library, score, or imitation of another designer.

Systra Taste brings design judgment into practical interface work. It focuses on composition, hierarchy, credible material and purposeful motion, not preset themes.

## Choose the working mode

One skill contains three working modes. Select from the actual task rather than requiring another installation.

- **Design:** For new pages, sections, flows and implementations. Follow the project-first process below and verify the working output.
- **Critique:** For audits, reviews or feedback on an existing interface. This mode is strictly **read-only by default**. Inspect and report evidence. Do not change code, add dependencies, open PRs or deploy. Read [review-workflow.md](references/review-workflow.md) and [audit-checklist.md](references/audit-checklist.md).
- **Refine:** For redesigning existing interfaces. Preserve the real content, routes, functionality and brand. When the user has not chosen a direction and asks for options, explore distinct compositions in isolated previews. Integrate only after the user selects a direction or explicitly asks for the changes. Read [repair-workflow.md](references/repair-workflow.md) and [repair-playbook.md](references/repair-playbook.md).

Scope is part of craft. A critique must not silently become an implementation. A request to adjust typography is not permission to change the navigation.



## Design mode: start with the project, not a style

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

Read [visual-signature.md](references/visual-signature.md) for the Systra visual defaults and exact Hugeicons React integration. Read [motion-patterns.md](references/motion-patterns.md) whenever building an animated hero, scroll narrative or interaction. These defaults apply only where the user's brand and explicit instructions do not prescribe otherwise.

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

## Systra visual defaults

When the project has no stronger visual conventions or conflicting brief:

- **Copy:** Never introduce em dashes into newly authored marketing or interface text. Use a period, comma or colon instead. Preserve quoted or immutable supplied content.
- **Corners:** Use subtly rounded corners, commonly 6 to 12 px at regular control/card sizes, with a coherent scale.
- **Surfaces:** Use no decorative box borders or box shadows. Group content through composition, whitespace and restrained surface contrast instead of framed cards. Keep necessary focus outlines, input boundaries and accessible states.
- **Icons:** Prefer real **Hugeicons** in new React UI, with consistent stroke/scale and semantic use. Verify actual imports from @hugeicons/react and @hugeicons/core-free-icons. Do not add a dependency or swap an existing icon system without checking project constraints.
- **Entrance motion:** Build a coordinated, refined hero arrival. Reveal meaningful text and media with restrained masking, small vertical movement or deliberate crop; avoid a large simultaneous fade for everything.
- **Scroll motion:** Include purposeful, selective scroll reveals or one meaningful scene transition when appropriate. A motion-heavy page must have quiet reading sections. Never hijack scroll or hide content under reduced motion.
- **Advanced motion:** Use GSAP, ScrollTrigger and Lenis when their capabilities improve the result. GSAP timelines may choreograph entrances, ScrollTrigger may control narrative scroll scenes, and Lenis may smooth scrolling. They are optional, not required. Read [lenis-gsap.md](references/lenis-gsap.md) before combining them and use a shared ticker, proper cleanup and native-motion fallbacks.
- **Quality:** Check mobile, keyboard focus, motion reduction, performance and actual rendered states. Do not claim that an animation is smooth or an interface is polished without verification.

These are explicit **defaults**, not permission to recolor other brands, remove accessibility cues or add unrequested animation to an established UI.

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
