# Systra motion language: entrance and scroll

The default Systra look is not static. Use **polished, purposeful entrance and scroll animations** as a distinguishing detail when motion suits the brief. Calm, readable content remains the primary experience. Preserve current motion styles when the user wants only a visual cleanup.

## 1. Establish a motion hierarchy

Choose at most:
1. **Hero entrance:** a coordinated, short arrival for heading, supporting copy, CTA and focal media.
2. **One or two narrative moments:** a scroll-driven crop, pinned product demo, before/after reveal, or scene handoff that explains something.
3. **Quiet supporting motion:** occasional section reveals, meaningful state changes and subtle hover/focus feedback.
4. **Stable sections:** reading, pricing, legal, long explanations and forms should not be constantly in motion.

Do not animate every element just because a library makes it easy. Motion should increase clarity and sense of craft, not time-to-read.

## 2. Hero entrance, intentional sequence

A useful starting composition:
- Title rises through a clipped line mask, with a subtle vertical offset. No word-by-word scatter.
- Supporting copy enters after the title begins, not after an unnecessary delay.
- Primary CTA arrives in the same flow. Keep it operable throughout and visible in the settled state.
- Hero media reveals from a crop or small scale change, with its subject and text-safe region stable.
- Use opacity and transform where possible. Blur is an optional supporting accent, not the main effect.

Starting ranges, not universal prescriptions:

| Element | Duration | Initial delay | Movement |
| --- | --- | --- | --- |
| Display heading | 550 to 800 ms | 0 to 100 ms | Y 12 to 28 px to 0 |
| Supporting copy | 450 to 650 ms | 100 to 200 ms | Y 8 to 16 px to 0 |
| CTA | 400 to 550 ms | 160 to 260 ms | Y 6 to 12 px to 0 |
| Focal image or interface | 650 to 950 ms | 80 to 180 ms | Crop reveal or scale 1.025 to 1 |

Prefer a controlled ease-out such as cubic-bezier(0.22, 1, 0.36, 1). Tune to the actual scene and avoid combining too many long delays. The full first view should become readable promptly.

## 3. Scroll animation selection

| Content job | Suitable scroll behavior | Avoid |
| --- | --- | --- |
| Reveal a section's argument | A restrained entrance as it enters the viewport | Reveal on every paragraph and caption |
| Demonstrate a product workflow | One pinned scene with two or three real product states | Endless static image parallax |
| Transition between hero and content | Full-bleed to inset crop, mask or scale handoff | Empty scroll distance and scroll-jacking |
| Compare two visual outcomes | Accessible wipe or side-by-side state control | Comparison hidden entirely behind animation |
| Show a portfolio | One large work image at a time with stable title/action | Five overlapping animated cards on mobile |
| Present numbers or evidence | One optional count or focused comparison transition | Fabricated rolling KPIs or perpetual counters |

Use IntersectionObserver for simple one-time in-view reveals. Use existing GSAP/ScrollTrigger, Motion or native scroll-driven CSS only when the project already has the dependency or the interaction genuinely needs its capabilities. Do not add a heavy animation library for a few fades.

For pinned or scrubbed scenes:
- Give the user sufficient still time to read each state. Keep scroll behavior reversible.
- Avoid nested scroll containers or trapping the user.
- Animate the subject or meaningful state. Do not move the entire page for decoration.
- On small screens, shorten or flatten elaborate sequences. The reading order must stay logical.
- For reduced motion, show the complete meaningful final state without requiring the scroll timeline.

## 4. Progressive enhancement example

This is a reference pattern, not code to paste into every project. It uses CSS for the entrance and IntersectionObserver only for optional in-view reveals. The page must remain visible when JavaScript or the observer is unavailable.

~~~css
:root {
  --systra-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: no-preference) {
  .hero-mask { display: block; overflow: clip; }
  .hero-mask > .hero-enter { display: inline-block; }
  .hero-enter {
    animation: systra-enter 700ms var(--systra-ease-out) both;
  }
  .hero-enter[data-delay="copy"] { animation-delay: 110ms; }
  .hero-enter[data-delay="action"] { animation-delay: 190ms; }
  @keyframes systra-enter {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-media-enter {
    animation: systra-media-reveal 850ms var(--systra-ease-out) both;
  }
  @keyframes systra-media-reveal {
    from { opacity: 0.6; transform: scale(1.025); clip-path: inset(3% 0 3% 0 round 10px); }
    to { opacity: 1; transform: scale(1); clip-path: inset(0 round 10px); }
  }

  /* Only motion-ready nodes are hidden; content with no JS stays visible. */
  [data-reveal].motion-ready {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 620ms var(--systra-ease-out),
                transform 620ms var(--systra-ease-out);
  }
  [data-reveal].motion-ready.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-enter, .hero-media-enter, [data-reveal] {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
~~~

~~~js
function setupSystraReveals() {
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const targets = [...document.querySelectorAll("[data-reveal]")];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: "0px 0px -24px 0px" });

  for (const node of targets) {
    // Never hide content already above the fold.
    if (node.getBoundingClientRect().top < window.innerHeight) continue;
    node.classList.add("motion-ready");
    observer.observe(node);
  }
  return () => observer.disconnect();
}
~~~

Integrate cleanup with the framework's lifecycle. Verify in a real browser; this code is a baseline, not proof that a production UI was inspected.

## 5. Interaction and QA gates

- Animate hover when it conveys interaction, not simply to make every button grow.
- Make mouse/touch/keyboard behaviors equivalent. Do not depend on cursor following for a primary action.
- Prefer compositor-friendly transform and opacity; avoid large-area live blur, scroll-driven layout recalculation or permanent will-change on dozens of elements.
- Avoid loading screens that create fake delay and prevent the user from reaching the page.
- Test narrow mobile, touch, a short laptop viewport, 200 percent zoom, reverse scrolling, reduced motion, and slow devices when available.
- If the project cannot be rendered or performance cannot be measured, report that accurately. Do not describe motion as "buttery smooth" without checking.
- No motion effect should obscure readable text, steal scroll, lower meaningful contrast or break core interactions.
