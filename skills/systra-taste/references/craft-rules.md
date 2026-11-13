# The Systra Craft Bar

Use this as a **decision checklist**, not a rigid theme. A strong interface has a specific point of view and remains usable.

## Composition
- Begin with the purpose: what must the audience understand or do next?
- Identify the actual focal object: a product surface, a result, a person, a process or a carefully selected editorial image.
- Pick an intentional composition rather than a standard "headline / three cards / CTA" template. Any layout is allowed if content justifies it.
- Put important proof next to the claim it supports, not in an unrelated testimonial carousel.
- Alternate information density and breathing space. The next section should advance the story.
- Use image crops that support content and text-safe regions. Product UI should be legible, not a decorative thumbnail.

## Type, spacing and controls
- Use an existing project type scale when present. Otherwise choose 1 functional sans family and only add an editorial display family when it does real work.
- Check body width on actual content; around 60–80 characters per line is a useful starting point, not a universal target.
- Prefer an explicit spacing rhythm over arbitrary one-off values. Verify that changing the font and localization doesn't break it.
- Keep buttons easily targetable on touch, with visible focus states, a clear verb and one primary action per decision point.
- Systra defaults: slightly rounded corners, no box shadows and no decorative borders around cards. Use whitespace and subtle surface contrast for grouping. Keep functional focus outlines, form boundaries and accessibility states. The actual brand system can override these defaults.

## Material and imagery
- A glass surface needs a real contextual background, deliberate light direction, legible foreground and enough separation. Never apply universal opaque milky cards to unrelated content.
- Use gradients or chromatic materials only where they communicate a subject or a recognizable visual identity.
- Use authentic product imagery where possible. Don't create fake product interfaces as hero background images. Essential text remains accessible code.
- If an image must be created, specify subject, camera, lighting, palette, aspect ratio, crop, exclusion list and intended safe zone. Do not claim you generated it when you only wrote a prompt.

## Interaction and motion
- Ask whether motion communicates state, attention, continuity or progress. If not, do not add it.
- Keep high-frequency UI operations fast and visually quiet. Motion-heavy scenes should be purposeful and relatively rare.
- Prefer compositor-friendly properties where practical. Do not use expensive blur for every element.
- Provide a reduced-motion alternative and a real static state for users who don't want animation.
- Test with keyboard, pointer and touch. Never make information available only on hover.

## Release gates

Mark **pass / fail / unverified**, not invented percentages.

1. Brand identity and user constraints respected.
2. Primary task clear in first viewport.
3. Distinct focal idea beyond color/decoration.
4. Section composition changes meaningfully across the page.
5. Typography remains legible with real content.
6. Accessible navigation, buttons, inputs and headings.
7. Mobile layout at narrow width without horizontal overflow.
8. Reduced motion and keyboard focus preserved.
9. No fabricated product claims or fake logos.
10. Render/build/tests actually verified, or explicitly marked unverified.

If a release gate fails, fix it or disclose it. No decorative polish can offset broken navigation or fake evidence.
