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

Approved rules with their why: [house-rules.md](references/house-rules.md).

- Albert Sans, Hanken Grotesk or Manrope, in light to regular weights (300 to 400, at most 500). No Inter, Geist, Poppins, Space Grotesk, Playfair. Serif only if the brand fits.
- White page, near-black ink. Color as subtle gradients with a fine crisp grain from ONE family of the brand color; grain on the background only; most sections stay white. No blobs, no beige, brown or terracotta by default.
- Large headlines, few words, generous whitespace, one oversized typographic moment per page.
- Cards and pills off-white #F9FAFB, no border, no box shadows, no glow, and only where they organise information. Rounded corners 6 to 12 px, larger only for image frames. Buttons 5 to 10 px or underline links, never pills. Few divider lines.
- Small labels above headings only now and then, in the body face. No invented numbers, stars, logos or quotes.
- Icons: MUST use real **Hugeicons** with a thin stroke (strokeWidth 1.25 to 1.5). No Lucide (it marks AI pages), no emoji or Unicode arrows.
- Copy must sound like the owner talking, not like a slogan generator. Follow the copy rules in the taste bar; no new em dashes.
- Motion has one job each: orient, reveal, focus, compare or hand off. Scroll motion is selective, never forced. CSS for small things; GSAP, ScrollTrigger and Lenis only when needed, see [lenis-gsap.md](references/lenis-gsap.md).
- Images in a draft are placeholders for the client's real photos: from the Systra Tools image library when connected, otherwise a calm grain panel with a note naming the photo. Never generate AI images, never fake photos in CSS.

## 4. Deliver

Show the rendered result, one sentence on the key design decision, and what was not tested. The logo must not be swappable onto a generic template, every action must work, and 320 px must stay readable.
