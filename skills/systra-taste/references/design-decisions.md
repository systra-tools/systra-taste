# Systra Design Decisions: practical, photo-free recipes

Use this when the user asks for a strong design but provides few visual references. It is a decision aid, not a style preset. Current brand, content, accessibility and constraints always take precedence.

## 1. Write a ten-line design brief before touching styles

Record internally:
- Audience and primary action: who needs to understand or do what?
- First-viewport promise: one concrete sentence without generic adjectives.
- Primary proof: actual product state, result, project, person or process.
- Focal subject: the ONE thing viewers should notice first.
- Composition model: name a specific arrangement and why it suits that subject.
- Copy hierarchy: exact heading, supporting line and one primary action.
- Image plan: approved existing media, newly authorized asset or no image.
- Movement plan: specify the purpose, or explicitly use no motion.
- Constraints to preserve: tokens, brand, routes, behavior and responsive needs.
- Failure to avoid: the first generic pattern this brief is likely to produce.

Do not surface this brief unless useful or asked. Implement the brief, not merely describe it.

## 2. Select architecture from the content, not the visual trend

| Page job | First composition to test | Supporting section | Common weak alternative |
| --- | --- | --- | --- |
| Explain software | A readable real UI as focal object, headline at its edge | One real task in three states | Tiny dashboard floating above generic cards |
| Sell professional expertise | A strong editorial statement beside work or a real person | One credible result and process | Abstract agency slogan and decorative shapes |
| Show creative work | Decisive project image or contextual crop with restrained type | Work narratives that vary in scale | Uniform thumbnail cards for every project |
| Explain a process | One spatial or sequential demonstration | Step-level evidence and outcome | Three equal cards with icons |
| Present research/data | One answerable question and one legible comparison | Methods, uncertainty, implication | Decorative chart and invented KPIs |
| Drive conversion | One distinct offer, verifiable proof and primary action | Objections and FAQ in readable order | Repeated CTAs without context |

These are starting points, not mandatory templates. A familiar grid is allowed when it genuinely serves a scanning task.

## 3. Fix hierarchy before embellishing

- Identify three reading levels: focal statement or subject, essential explanation, and supporting metadata. More levels require a clear reason.
- Set the longest real heading before choosing its size. Check line breaks at narrow mobile, laptop and wide desktop.
- Start with existing typography tokens. If absent, use one functional sans family; add display contrast only when it clarifies the editorial hierarchy.
- Use a repeatable spacing progression. Avoid random margins inserted to patch one viewport.
- Make one primary action obvious, then scale down secondary actions. Don't turn every label into a pill.
- Put proof close to the claim it supports. A customer's actual outcome is stronger than a row of unverifiable logos.
- At every section boundary, ask which new question the next section answers. If none, combine or remove it.

## 4. Material, imagery and copyright

This public skill bundles NO photographs, screenshot moodboards, visual atlases or remote images.

Choose in this order:
1. Approved assets already present in the user's project. Inspect their crop, licensing, text-safe region and mobile suitability.
2. A new purpose-built asset only when requested or authorized by the user's tooling and brief. Specify subject, context, camera, lighting, palette, aspect ratio, responsive crop, exclusion list and alt-text direction.
3. A text-led or code-native composition when imagery is not available or does not help.

Never scrape, download, imitate or redistribute third-party visual references as part of this skill. A user-supplied screenshot is project context, not permission to duplicate someone else's distinctive composition or publish the screenshot.

Keep headings, buttons, forms, figures and meaningful data in semantic code. Never bake functional interface content into a hero image.

### Material decisions

- Glass requires actual background depth, a functional purpose and checked contrast; do not place milky blur cards over an empty background.
- Shadows should communicate elevation or focus. Borders should communicate separation. Avoid applying both mechanically.
- Grain and gradients can reinforce a deliberate image world, not rescue weak information architecture.
- Squircles, sharp modules and pills are context-driven shapes, not mandatory house style.

## 5. Motion that explains, rather than decorates

For every animated element, complete: “This motion helps the user to ____.” Valid answers include orient, reveal, compare, focus, indicate progress or hand off between states. If the sentence is empty, remove the effect.

Prefer:
- a short clipped line reveal for one meaningful headline transition;
- a contained product-state change with a stable surrounding interface;
- one large scene handoff followed by calm sections;
- a cursor affordance only on fine-pointer devices, with normal keyboard/touch access.

Avoid:
- endless scrolling effects, staggered paragraph letters and animated every-section entrances;
- theatrical loading delays or hover motion on frequent keyboard actions;
- simultaneous scroll pin, camera move, blur, scale and text animation without clear priority.

Prefer transform and opacity when practical, avoid unbounded scroll listeners and excessive blur, and make every scene reversible when users scroll backward. Respect reduced motion with a complete static state. Do not trade accessibility for visual novelty.

## 6. Three useful replacement patterns

**Generic hero -> proof-first hero.** Replace vague headline, glow and three benefit cards with one real product or project demonstration. Anchor a specific outcome beside it. The next section should show how the result happens.

**Repetitive features -> paced explanation.** Replace several identical grids with a sequence of differentiated sections: real task, proof, critical detail, comparison, final action. Keep shared tokens while changing information density and layout.

**Decorative glass -> scene-aware interface.** Retain glass only if there is a believable underlying scene and an actual control or piece of information on top. Otherwise use a solid surface and correct the hierarchy.

## 7. Verify the real result

Mark each item PASS, FAIL or NOT TESTED:
- The top viewport communicates one concrete benefit and one next action.
- The page retains the project's identity and verified content.
- Changing only the logo would NOT turn it into an interchangeable SaaS landing page.
- Each section advances the content, not just the decoration.
- Headings, links, inputs and charts stay semantic and readable.
- No fake proof, invented customers, placeholder metrics or external artwork was published.
- At narrow mobile widths, text wraps and the layout has no sideways overflow.
- Keyboard, focus, touch and reduced-motion paths remain usable.
- Existing routes, forms and UI behavior still work.
- Screenshots or a browser render were actually inspected; otherwise explicitly say NOT TESTED.

When a design fails on architecture, change the layout first. Do not merely recolor it or add effects. Do not invent a numerical taste score.

## 8. Deliver with evidence

Provide the working result, the dominant visual idea, the largest decision taken and the tests actually completed. If asked for alternatives, change composition and focal subject, not just colors. If visual tooling is missing, say which assumptions remain unverified rather than claiming a polished screenshot.
