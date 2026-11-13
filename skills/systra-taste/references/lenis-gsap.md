# Optional GSAP + Lenis: premium scroll choreography

GSAP, ScrollTrigger and Lenis are **welcome choices** for high-fidelity motion, not required dependencies. Choose the least complex tool that meets the actual design goal. Respect existing brand direction, accessibility, page performance and explicit instructions.

## Decision ladder

| Need | Prefer |
| --- | --- |
| Simple hover, stagger, small reveal | CSS or IntersectionObserver |
| Coordinated hero entrance or complex transformation | GSAP timeline |
| Scroll-synchronized sequence, meaningful pin or progress | GSAP + ScrollTrigger |
| Deliberate eased scrolling for an editorial site | Lenis, when genuinely useful |
| Smooth scrolling plus synchronized product narrative | Lenis + GSAP + ScrollTrigger |

Do not introduce a heavy dependency for ordinary fade-ins. GSAP is useful without Lenis. Use native scrolling for forms, product dashboards, short pages, accessibility-critical interfaces and any project that already has a functioning scroll controller unless there is a compelling brief.

## Canonical integration

Install only when the user authorizes the architecture or the requested implementation clearly needs it:

```sh
npm install gsap lenis
```

Use current package names. Do not use the deprecated @studio-freight/lenis package. Import Lenis CSS. Drive Lenis from the GSAP ticker so there is **one animation clock**.

```js
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Call once from an app shell, never once per section.
export function setupSystraScroll(root = document) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {}; // Native scrolling and static content.
  }

  const scope = root === document ? undefined : root;
  const ctx = gsap.context(() => {
    gsap.utils.toArray("[data-gsap-reveal]", root).forEach((node) => {
      gsap.from(node, {
        autoAlpha: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 88%",
          once: true,
        },
      });
    });
  }, scope);

  const lenis = new Lenis({
    autoRaf: false, // GSAP ticker owns the clock.
    smoothWheel: true,
    syncTouch: false, // Keep touch scrolling native.
    anchors: true,
  });

  const updateTriggers = () => ScrollTrigger.update();
  const tick = (time) => lenis.raf(time * 1000); // seconds to ms
  lenis.on("scroll", updateTriggers);
  gsap.ticker.add(tick);
  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(tick);
    lenis.off("scroll", updateTriggers);
    lenis.destroy();
    ctx.revert();
  };
}
```

This is a starter example for browser projects. It assumes document-level scrolling with the standard window scroller and one controller. A transformed or custom scroll container requires its own integration and must be tested. It must not be pasted into server-rendered code paths that lack window or document.

In React, initialize this once in a client-side application effect and execute the returned teardown during unmount. For component-level timelines use GSAP context or @gsap/react useGSAP to scope and clean up animations. On a live change to the reduced-motion preference, reconfigure the animation system. The reference above tests the preference at initialization only.

## Performance, behavior and QA

- Keep one rAF clock. Do not enable Lenis autoRaf when GSAP ticker is calling lenis.raf.
- The GSAP ticker supplies seconds; Lenis RAF needs milliseconds, so multiply time by 1000.
- Lenis scroll events must notify ScrollTrigger when combined.
- gsap.ticker.lagSmoothing(0) is a documented optional adjustment for synchronization issues, but it changes global GSAP behavior. Make that choice once at app level, not in reusable section components.
- Do not mix Lenis with another global smooth scroller without removing the redundant controller.
- Recompute ScrollTrigger positions after significant content, font, image or layout changes.
- Use pinned scenes sparingly. A real narrative state should change, and the user should be able to scroll backward.
- Avoid scroll jacking, inaccessible nested scroll regions, artificial wheel damping and excessively long easing.
- Validate anchor navigation, back/forward history, browser scroll restoration, keyboard navigation, focus jumps, dialogs, nested scrolling, touch and routing.
- Flatten complex pins on mobile and always provide meaningful static states for reduced motion.
- Do not claim buttery smooth motion without rendering the actual page and checking it on appropriate devices.

For actual GSAP sequences, build one clean timeline for a coordinated hero entrance and a separate scoped ScrollTrigger timeline for each necessary storytelling scene. Keep the headline and core content meaningful when motion is unavailable. Animated text should remain accessible and avoid showing critical content only while the user is scrolling.

## Official references

- https://github.com/darkroomengineering/lenis
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/GSAP/gsap.context()/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
