# Systra visual signature: calm surfaces, sharp decisions

Use these as **Systra defaults** when the user has not supplied a conflicting brand system or aesthetic direction. Never overwrite a client's tokens, accessibility needs or explicit instructions. Do not restyle an existing interface outside the requested scope.

## Copy and punctuation

- In newly written UI copy, marketing text, captions and explanations, **never use em dashes as sentence punctuation**.
- Use periods, commas, colons or a new sentence instead. Preserve em dashes only inside quoted user-supplied text or exact legal/brand content that must not be altered.
- Keep headlines specific. Prefer an observable benefit or concrete action over "reimagine", "unlock", "seamless", "next-generation" and other empty AI phrasing.
- Limit each section to one clear claim and its direct support. Avoid ornamental eyebrow labels and random badges.

Examples:

| Avoid | Prefer |
| --- | --- |
| Build faster with AI, one click away | Find a usable section, then adapt its code. |
| A better site, without the busywork | A better site. Less busywork. |
| Everything you need, all in one place | Search components, inspect code and ship. |

## Surface and shape rules

- Default to light or neutral surfaces with intentional contrast, not a universal black canvas.
- Use subtly rounded corners, **roughly 6 to 12 px** for ordinary cards and controls, adjusted to their size. Keep smaller controls at the lower end and larger surfaces coherent with the same radius scale.
- Default to **no box shadows, drop shadows, glow shadows or text shadows**. Lift and depth should come from scale, spacing, contrast, material, crop and a real layered scene.
- Default to **no decorative borders or 1 px outlines around cards, panels, badges or repeated content boxes**. Establish groups through whitespace, alignment, type hierarchy and subtle surface contrast.
- **Do not remove functional boundaries**: input fields, error states, selected states, keyboard focus indicators, tables that require separators and high-contrast/accessibility modes may need visible strokes. These are not decorative card frames.
- Cards are optional. If a section reads better without a container, remove it rather than making the card more stylish.
- Avoid stacks of repeated squircle or pill cards, thick frames, boxed-in bento layouts and shadow-based hover "elevation".
- A hero is not automatically centered. Choose the layout based on the product, audience and content.

## Icon direction

- Default to **Hugeicons**, with one consistent stroke-based style. Use icons only when they clarify meaning, navigation, state or action.
- For React, use the maintained packages **@hugeicons/react** and **@hugeicons/core-free-icons**. Do not use the legacy deprecated **hugeicons-react** package in new code.
- Import specific exported icons. Check that an export exists, never invent component names. Use the project's licensed Hugeicons Pro package only when its availability and license are confirmed.
- Use around **20 to 24 px** for most action icons and **16 to 20 px** for dense controls, depending on their context. A stroke width around **1.5** is a useful default, not a mandate.
- Icons should generally inherit current text color. Align their optical baseline with the label. Avoid mixing icon families or using oversized decorative icons as a substitute for meaningful imagery.
- An icon-only button needs an accessible name and a visible keyboard focus state. Decorative icons should not be read as independent information by assistive technology.
- If the existing project already uses another icon system and replacing it would break consistency or exceed the requested change, preserve it. For new Systra-designed React sections, prefer Hugeicons.

Example verified against the official free-package documentation:

~~~jsx
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon } from "@hugeicons/core-free-icons";

function SearchButton() {
  return (
    <button type="button" aria-label="Search">
      <HugeiconsIcon icon={SearchIcon} size={20} color="currentColor" strokeWidth={1.5} />
    </button>
  );
}
~~~

Official React documentation: https://hugeicons.com/docs/integrations/react/quick-start

## Responsive design details

- Derive headings from actual copy and control their wrap intentionally. Keep the focal object readable on mobile; do not simply scale everything down.
- Protect touch targets, form affordances and keyboard focus. Decorative "no borders" must never imply "no focus outline".
- Use consistent gutters, readable measure and rhythm before introducing special effects.
- For ordinary interfaces, one typography system and one radii scale are enough. Strong composition should do the differentiation.

## QA for the signature

Evaluate **newly authored text** for unwanted em dashes and vague claims. Inspect actual rendered surfaces, not just CSS declarations:
1. No decorative shadows or box borders.
2. Subtle, consistent corner rounding.
3. Icons are purposeful, consistent, genuine Hugeicons imports where applicable.
4. Focus, inputs and selected states remain distinguishable.
5. The layout still works without animation or imagery.
6. The site's true brand and the user's explicit directions win over these defaults.
