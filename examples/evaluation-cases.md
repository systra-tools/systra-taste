# Systra Taste evaluation cases

Use these as regression prompts when evolving the skill. These are **tests to run**, not claims that a model has already passed. Compare the same agent, model, project context and task with the skill enabled and disabled. Evaluate a rendered implementation, not just the agent's prose. No external reference images are needed.

## Case A: product landing page

**Prompt:** "Build a React + Tailwind landing page for a developer tool that searches reusable UI components. Show how someone goes from finding a section to shipping it. Make the experience refined. No images or screenshots are supplied."

Expected:
- One credible code or product workflow, not an invented dashboard or abstract glow.
- Content-first hierarchy, real interactive elements and purposeful sections.
- Coherent entrance motion plus at most one meaningful scroll sequence when appropriate.
- Purposeful Hugeicons imported from real installed packages, if iconography is useful.
- Light or otherwise justified surface, slightly rounded corners, no decorative shadows or frames.
- No em dashes in original UI copy.
- Semantic code, narrow mobile support, visible focus, reduced-motion fallback.
- Explicit statement if product screens are illustrative instead of genuine.

Failure signals: headline and three uniform cards; meaningless statistics; dozens of scroll reveals; fake image content; dead controls.

## Case B: local service business

**Prompt:** "Create the website hero and next three sections for a local commercial cleaning provider. The tone is professional rather than consumer-facing. You have verified company copy but no approved photos. Do not invent testimonials, credentials or case studies."

Expected:
- Proof and process use real claims only. Do not fabricate customer logos or quotations.
- Strong editorial first impression that can work without a photo.
- Varied section architecture; sensible CTA for business enquiries.
- No giant decorative icons, box shadows or outlined bento cards.
- If imagery would genuinely help, give an explicit authorized asset brief or use a text-first design.
- Entrance and scroll motion feel intentional, not ornamental.
- All original copy has no em dash punctuation.

Failure signals: invented photos as real client work, empty 3D hero objects, generic claims, an image-heavy page without actual assets.

## Case C: editorial studio portfolio

**Prompt:** "Build a portfolio page with two approved projects and long project descriptions. Make the work the focus. Show a smooth intro and one memorable scroll handoff. Preserve the existing navigation and brand colors."

Expected:
- Approved projects are primary visuals. Real text supports them.
- One calm first-view entrance and one stable scroll transition with safe reading time.
- Multiple content lengths work and existing navigation remains functional.
- No fake shadow elevation and no card borders used merely to contain projects.
- Reduced motion shows all content immediately and mobile does not depend on pinned scroll.

Failure signals: cards everywhere, disappearing text, forced scroll, copied visual from another studio, broken navigation.

## Case D: override and restraint

**Prompt:** "Update only the spacing of a client's existing dark enterprise dashboard. Keep the square corners, Lucide icons, table borders, no animation and existing text. Do not add dependencies."

Expected:
- Preserve the client's square radius, border-based tables, icons and deliberate no-motion policy.
- Change only spacing, and do not rewrite supplied copy.
- No Hugeicons installation and no new entrance animation.
- Explain that the project's explicit system overrides Systra defaults.

Failure signals: blindly installing Hugeicons, adding rounding, removing functional table borders, new scroll effects, editing unrelated text.

## Case E: GSAP and Lenis when justified

**Prompt:** "Build a portfolio case study with a choreographed GSAP hero entrance, one meaningful ScrollTrigger project handoff and Lenis smooth scrolling. Keep native anchor navigation, touch and reduced-motion behavior."

Expected:
- GSAP coordinates one meaningful timeline rather than animating every section.
- Lenis and ScrollTrigger share one ticker with milliseconds conversion and teardown.
- No duplicate Lenis instances, double rAF loops, scroll traps or broken routing.
- No forced smooth scrolling under reduced motion.
- On mobile, pinned scenes simplify and reading order stays intact.

Failure signals: dead anchors, inaccessible pinned content, missing cleanup, or every paragraph animated.

## Evaluation worksheet

For each case, record pass / fail / unverified for:
1. Requested scope and project identity.
2. Specific visual idea with authentic proof.
3. Composition and section variation.
4. Meaningful type and copy, including punctuation.
5. Icon source and stylistic consistency.
6. Subtle corners, shadow-free and unframed default surfaces.
7. Purposeful entrance and scroll behavior.
8. Keyboard and mobile usability.
9. Reduced motion and slow-device performance.
10. Real browser verification, honest limitations and preserved functionality.

Keep screenshots, exact prompts, environment and failing code samples from **authorized** test projects outside this public text-only skill repository. Do not invent preference scores, conversion uplifts or wins over other skills.
