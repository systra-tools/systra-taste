---
name: systra-taste
description: Reference-led art direction, UI craft, copy and purposeful motion for websites and React/Tailwind projects. Use to design new pages or sections, critique interfaces, or refine UI without losing brand or behavior. Triggers: Systra Taste, Website, Startseite, Landingpage, Section, Redesign, Design-Kritik.
---

# Systra Taste 3.3

Make the subject memorable, the hierarchy clear, and the interaction useful. Taste first, process second. Always read [taste-bar.md](references/taste-bar.md) before designing; it holds the rejection list and the scoring loop.

## 1. Route

- **Design:** inspect the project and brief, then [section-router.md](references/section-router.md). Read only the matching recipe per section job. Source real sections via [component-first.md](references/component-first.md): existing project component first, then the connected Systra Tools MCP searched with the industry and job ("hero for a painting company"), then local fallbacks.
- **Critique:** read-only by default. Use [review-workflow.md](references/review-workflow.md) and [audit-checklist.md](references/audit-checklist.md).
- **Refine:** preserve content, routes, behavior and brand. Use [repair-workflow.md](references/repair-workflow.md) and [repair-playbook.md](references/repair-playbook.md). Explore requested alternatives in isolated previews first.

## 2. Loop

1. Inspect brand, fonts, assets, components, content and constraints. Brand and explicit instructions win. Write a three-line brand read: who visits, what mood, and a color intensity (Calm, Medium or Vivid, see [gradients.md](references/gradients.md)). It decides color, type scale and motion.
2. Reference hunt and concept, see [concept.md](references/concept.md): look at 3 to 5 real sites of the industry, note 3 moves with source, then one concept sentence that only fits this business and one signature moment. "Clean and modern" is not a concept. Sketch two genuinely different compositions for it and pick one.
3. For every section, name its job and its role from the taste bar. No two neighbouring sections share a skeleton.
4. Adapt real source or build. Each section has one focal subject: a photo, a real object, a statement, a product state. Never a blob or a floating card stack.
5. Render desktop and 390/320 px mobile, look at the screenshot as a stranger would, run `node engine/taste-lint.mjs`, score it with the taste bar, apply the AI-tells check in concept.md, and do a screenshot-led correction pass. Below 9 of 10 or any rejection hit: change the architecture, not the colors. Then the finish checks in the taste bar. Mark unavailable checks NOT TESTED.

## 3. Signature (unless the brand overrides it)

- Albert Sans (or the brand face) for display and body. No italic serif accent by default; one serif only with a reason from the content.
- White page, near-black ink. Color comes as grain gradients from ONE family built on the brand color, at the intensity the business fits; most sections stay white. White cards on a panel showing a real moment are one possible device, at most once per page. Beige, olive, brown and terracotta are never defaults.
- Large confident headlines, few words, generous whitespace, and one oversized typographic moment per page.
- Slightly rounded corners, 6 to 12 px; buttons 6 to 10 px. No borders around cards or pills, no box shadows, few divider lines. Glow and shadow only very subtle, if at all.
- No uppercase mono kicker or eyebrow above every heading. No invented numbers, stars, logos or quotes.
- MUST use real **Hugeicons** for functional icons in new Systra-style UI (@hugeicons/react, @hugeicons/core-free-icons); verify exports. No Unicode arrows or emoji as icons. Keep a brand's existing icon system.
- Copy must sound like the owner talking, not like a slogan generator. Follow the copy rules in the taste bar; no new em dashes.
- Motion has one job each: orient, reveal, focus, compare or hand off. Scroll motion is selective, never forced. CSS for small things; GSAP, ScrollTrigger and Lenis only when needed, see [lenis-gsap.md](references/lenis-gsap.md).
- Photos, people and 3D come from approved assets. If an asset is missing, write an exact image prompt with crop and text-safe area instead of faking it in CSS.

## 4. Deliver

Show the rendered result, one sentence on the key design decision, and what was not tested. The logo must not be swappable onto a generic template, every action must work, and 320 px must stay readable.
