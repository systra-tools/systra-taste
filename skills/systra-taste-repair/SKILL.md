---
name: systra-taste-repair
description: Replace a working but generic AI-generated landing page or React UI with distinctive, brand-consistent design options, real before/after previews and a safely integrated chosen design. Use when the user says make this website less AI-looking, repair its design, redesign the hero without changing its behavior, or show several better visual directions. For critique only use systra-taste-review.
---

# Systra Taste Repair

This skill turns **generic-looking working UI** into a considered design while preserving actual behavior. It does not create unrequested pages, invent assets or hide regressions.

## Modes

- **Explore (default when the user has not chosen a direction):** build three *genuinely different* design variants in an isolated preview surface. Don't replace the production UI until a choice is made.
- **Implement (when the user selects a variant or explicitly authorizes a specific design change):** integrate the chosen direction and verify it, without unnecessary further confirmation.
- **Audit-only requests:** use `systra-taste-review` instead.

## Workflow

1. **Capture the truth.** Identify the route/component, stack, brand tokens, existing behavior, real copy, user journey, constraints, dependencies, and available media. Identify what must **not** change.
2. **Make a baseline.** Render screenshots at mobile and desktop if tooling permits. Save or describe the exact pre-change state. If tooling is absent, say that the comparison is source-based only.
3. **Diagnose the cause.** Name the highest-impact structural issue first: generic composition, unclear visual hierarchy, repeated rhythm, irrelevant imagery, unusable interaction or weak contrast. Don't use taste adjectives alone.
4. **Select three directions** along genuinely different axes. Examples:
   - **Editorial:** deliberate typography and content-first hierarchy.
   - **Product evidence:** real, legible interface as the focal point.
   - **Immersive narrative:** one strong visual subject and paced scroll.
   Match directions to the actual product and user brief. Do not make three color variants.
5. **Prototype safely.** Use an isolated preview route or standalone HTML. Keep production code unchanged during exploration. Each prototype must show real content and working interactions, in realistic context.
6. **Present the trade-offs.** State what each direction improves, what it sacrifices, and which user task it serves. Let the user choose rather than silently promoting your favorite.
7. **Integrate when selected.** Preserve links, forms, route semantics, user data flow, responsive behavior, keyboard focus and performance. Reuse project components, assets and tokens. If Systra Tools MCP is connected, search/select genuine components and only fetch code with authorized access.
8. **Verify after editing.** Inspect mobile, desktop, overflow, long labels, dark mode where supported, reduced motion, core interactions, console and existing test/build scripts. Compare with the original. Be explicit about tests you couldn't run.
9. **Hand off.** Provide a concise table of changes, validation results and known limitations. Never say it is better by a numeric percentage without user-study evidence.

## Safety and compatibility

- Never change brand identity, content claims, payment/auth flows or routing implicitly.
- Never deploy or merge without the user's publishing authorization.
- Never upload private repo code or screenshots to external services without authorization.
- Never create a public library of third-party visual references without rights.
- Don't claim a visual browser comparison when only source code was inspected.
- If no browser exists, create the best possible isolated prototype and disclose that visual QA is pending.

Read [repair-playbook.md](references/repair-playbook.md) for practical structural replacements and a release gate.

**Systra advantage:** This workflow can turn a design diagnosis into an actual component-based replacement. It is not just an aesthetic score. Its value must be demonstrated with real side-by-side results, not asserted.
