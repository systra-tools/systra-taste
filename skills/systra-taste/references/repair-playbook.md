# Repair Playbook

## Diagnose the real problem before changing styles

| Observed problem | Structural repair | What not to do |
| --- | --- | --- |
| Generic feature grid dominates the page | Replace with real product flow or meaningful comparison | Add gradients to the existing cards |
| Hero copy says nothing specific | Identify a real user job and supporting evidence | Replace one vague slogan with another |
| Product preview is unreadable | Center one large real product state; show only supporting callouts | Scatter small fake screenshots |
| Every section repeats a two-column split | Change pace between editorial, product demonstration and proof | Alternate left/right while keeping identical content |
| Unclear interaction states | Make state, affordance and feedback visible | Animate icons without fixing state |
| Motion feels slow | Remove effects on repeated operations; reserve movement for key moments | Make every section scroll-reveal |

## Three variant review

Give every direction:
- A distinct **composition architecture**.
- A different **focal proof object**.
- A plausible **user task** it optimizes.
- A named **trade-off**, such as vertical space, implementation effort or visual intensity.
- A working interaction and a realistic mobile arrangement.

If two variants differ only in color, radius, font or mood, merge them and invent a truly distinct alternative.

## Verification
- Baseline and final screenshots at named viewports, if browser tools exist.
- Confirm content, CTA destinations, forms, route behavior and links unchanged except where explicitly intended.
- Test 320px mobile, typical desktop, keyboard navigation, 200% zoom and reduced motion where possible.
- Run available test, lint, typecheck and build scripts. Report exact outcome rather than "all good".
- When the project has existing analytics, consent and privacy requirements, do not change them unless explicitly requested.

## Systra MCP as an optional source

With a configured, authorized Systra Tools MCP connection:
- Search for **real** components matching the diagnosed need.
- Check the component source and dependencies before using it.
- Adopt the project's colors, typography and existing patterns.
- Respect licensing and permission boundaries.
- Don't require MCP to finish a repair; the skill's design judgment works without it.
