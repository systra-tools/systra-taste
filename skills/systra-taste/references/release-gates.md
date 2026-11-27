# Blocking release gates

Use this expanded checklist for complex or failing work; the concise core checks apply to every new section. Keep critique read-only. These are agent instructions and evidence requirements, not a claim that a package can automatically judge aesthetics.

## Gate 0: visual reference evidence

For substantial new work, record one or two relevant authorized reference images or rendered previews inspected, and one specific observed visual principle from each. Identify the chosen focal subject and at least one rejected architecture alternative for substantial new work. A filename or text description alone does not count as viewing a reference. If visual reference tooling is unavailable, mark NOT TESTED and do not claim that the visual design bar is verified. Preserve privacy and licensing; no premium source or screenshots are redistributed.

## Gate 1: genuine icons (objective)

For new Systra-style React UI with functional icons:
1. Verify package.json and installed dependencies: @hugeicons/react and @hugeicons/core-free-icons (or an explicitly licensed approved Hugeicons package).
2. Verify each named export via the actual installed module or TypeScript. Build and inspect rendered SVG in the relevant controls. No invented exports.
3. Inspect source and rendered UI for functional Unicode arrows, ticks, emoji, improvised SVGs or other icon families. Replace substitutes with genuine Hugeicons.
4. Icon-free sections are allowed if icons are unnecessary. An existing brand icon system or explicit no-dependency instruction is an override: record it with evidence.
5. Missing/blocked required package or rendering is FAIL/BLOCKED/NOT TESTED, never PASS. Do not hide a missing dependency with substitute glyphs.

## Gate 2: design direction (visual judgment)

Capture desktop and narrow mobile screenshots. Inspect both, not just DOM or overflow. Record:
- dominant focal idea and why it belongs to this content;
- distinct composition from the rejected alternatives;
- typography: actual family, visual scale, line breaks, text edges and hierarchy;
- color/material: coherent accent hierarchy and no arbitrary decoration;
- spacing: optical rhythm, meaningful negative space, no repeated generic cards;
- actual product/scene: understandable, credible and purposeful.

Fail if the only meaningful changes are bigger text, fewer borders, recoloring, or a familiar layout with a different logo. A routine pricing comparison may use conventional columns if its content warrants it; identify the actual refinement rather than forcing asymmetry. Compare against the chosen art direction, not a numerical taste score.

## Gate 3: signature and mechanics

Check the rendered result for decorative shadows/frames, intended 6 to 12 px radius, correct text punctuation, useful Hugeicons and functional boundaries. Verify typography actually loaded; check measured color contrast where possible. Keep brand constraints and semantic copy. Hover/focus/touch states, reduced motion and links work. Motion has a concrete job and does not delay reading. Run the actual build/test command where available.

## Gate 4: correction loop

If any gate fails, revise the affected scope and capture another screenshot. If composition fails, try another architecture rather than adding gradients or effects. If icon integration fails, fix the imports and build before declaring completion. Re-run the gates. One focused correction pass is required for material visual or functional defects when rendering is available, and the result must be reported honestly even if still unsuccessful.

## Gate 5: delivery evidence

Report PASS / FAIL / BLOCKED / NOT TESTED per applicable gate, actual build command, inspected viewport sizes, icon source and any real override, and one specific visual decision. If screenshots or build tools are unavailable, mark them NOT TESTED. Do not claim aesthetic excellence from a passing functional test. Do not claim a skill is proven better until an independent controlled A/B test has been run. See the repository's evaluation cases.
