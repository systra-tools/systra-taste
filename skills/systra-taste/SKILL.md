---
name: systra-taste
description: Reference-led art direction, UI craft, and purposeful motion for websites and React/Tailwind projects. Use to design new sections, critique existing interfaces, or refine scoped UI without losing brand or behavior.
---

# Systra Taste 3.1

Make the subject memorable, the hierarchy clear, and the interaction useful. Do not apply a house template.

## 1. Route before reading

- **Design:** inspect the actual project and brief, then use [section-router.md](references/section-router.md). Read only the matching recipe for each distinct section job, not the entire reference folder. Prefer actual source via [design-engine.md](references/design-engine.md) and [component-first.md](references/component-first.md). For authorized live search and source retrieval use [live-mcp.md](references/live-mcp.md). For a matching offline job, run the engine plan/build CLI rather than rewriting source.
- **Critique:** strictly read-only by default. Use [review-workflow.md](references/review-workflow.md) and [audit-checklist.md](references/audit-checklist.md) for evidence; do not edit or deploy.
- **Refine:** preserve content, routes, behavior and brand. Use [repair-workflow.md](references/repair-workflow.md) and [repair-playbook.md](references/repair-playbook.md) when needed. Explore requested alternatives in isolated previews before integrating a selected direction.

## 2. Design in a short loop

1. Inspect existing brand, fonts, assets, reusable components, content, controls and constraints. Brand and explicit instructions take precedence.
2. Name the one job and one focal subject. For a substantial new section, inspect 1–2 relevant authorized visual references; reuse already-inspected references across related sections. If none are available, work from the brief and mark reference inspection NOT TESTED. Do not block on searching.
3. Compare two genuinely different composition ideas briefly. Choose one matching existing project, authorized MCP or bundled component and adapt its real source; write from scratch only when none fits. Do not produce a long design rationale or read additional references merely to satisfy a checklist.
4. Let the subject drive the type, crop, scale and color. A chart, real product task or photograph should dominate, not a decorative dashboard, arbitrary blob or repeated grid.
5. Render and check desktop and narrow mobile, actual interaction and keyboard/reduced-motion behavior. Fix material visual or functional defects in one focused screenshot-led correction pass and verify the fix. Mark unavailable checks NOT TESTED. Never claim a pass from prose alone.

## 3. Signature (unless the project explicitly overrides it)

- Use no new em dashes in UI copy. Specific, concise language.
- Prefer coherent, subtly rounded corners (6–12 px), no decorative borders or box shadows. Keep functional input and focus boundaries.
- MUST use real **Hugeicons** when functional icons are needed in new Systra-style UI. In React use @hugeicons/react and @hugeicons/core-free-icons, verify installed named exports and rendered SVGs. No Unicode arrows/checks or invented icons as substitutes. Keep existing icon systems where required; disclose a blocked dependency. Icon-free layouts are valid.
- Choose one typographic direction per project, not a mandatory sans plus italic serif formula. Use the actual font inventory. Change scale, weight, width, tracking and rhythm intentionally; italic serif only if the content benefits.
- Motion clarifies a real state, a transition or spatial continuity. Scroll motion is selective; no forced scrolling. Use CSS for small interactions. GSAP, ScrollTrigger and Lenis are optional; consult [lenis-gsap.md](references/lenis-gsap.md) only when using them together.
- Use approved project imagery when it matters; do not fake a photographic subject with cheap CSS. Do not copy third-party compositions verbatim or redistribute premium source or images. Systra Tools MCP is optional; search only within authorized access.

## 4. Deliver

Show the actual implementation or preview, one concrete design decision and any failed/unverified checks. Check that the logo cannot simply be swapped onto a generic template, that the action works, and that the result remains readable at 320px.

The public package includes original standalone React components and text references; no bundled photos or premium source. For detailed policy and troubleshooting use [visual-signature.md](references/visual-signature.md) or [release-gates.md](references/release-gates.md) selectively, not by default. More references are available via the router.

https://systra.tools/mcp
