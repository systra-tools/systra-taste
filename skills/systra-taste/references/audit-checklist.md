# Audit Checklist and Severity

For each observation mark its evidence:
- **Rendered**: personally inspected a screenshot/browser at the named viewport.
- **Code-backed**: supported by the implementation but not visually verified.
- **Hypothesis**: plausible concern requiring verification.

## Severity
- **P0:** broken core interaction, major inaccessible content, unreadable key content on a target viewport.
- **P1:** primary offer unclear, false visual affordance, credible major layout or product comprehension failure.
- **P2:** repeated structure, generic image language, inconsistent spacing, weak typography, unclear subordinate interaction.
- **P3:** optional polish unlikely to affect comprehension.

Don't rank a visual preference as a P0 defect.

## Audit each layer
- Meaning: headline specificity, actual offer, visible next action, proof.
- Reading: visual order, type scale, density, line lengths, responsive wrapping.
- Composition: subject hierarchy, repeating templates, section pacing.
- Identity: brand tokens, typography, existing differentiation, no unearned trend effects.
- Motion and feedback: no unnecessary delay, clear state, reduced motion.
- Resilience: long copy, broken image, empty/error states, 320px viewport, focus and keyboard.

## Deliverable template
1. Two-sentence diagnosis.
2. Issues table: priority / evidence / before / proposed change / why / confidence.
3. "Keep" section: choices worth preserving.
4. First three fixes in implementation order.
5. Things not inspected. Do not pass an inference off as screenshot evidence.

A screenshot cannot prove source architecture. Source alone cannot prove perceived visual quality. Name the limit.
