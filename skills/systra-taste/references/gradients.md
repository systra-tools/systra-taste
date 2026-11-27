# Gradients: soft, different, on a neutral page

Approved by Amelie on 27.11.2026 after three rounds on a driving-school page:

1. One sage family everywhere: too little color, every gradient the same.
2. Lime, mint and sky mixed into every panel at strong saturation: too intense, and the panels still looked alike because they all mixed the same three hues.
3. Accepted: soft gradients, and every surface its own color world with its own light direction, on an otherwise neutral page.

The page stays calm because color lives on a few surfaces, not because the color is pale or because there is only one hue.

## 1. The model

- **Neutral base.** White or off-white #F9FAFB carries most of the page. Large sections such as a process panel get at most a faint wash (one hint of color from one side).
- **Two to four color surfaces.** Tiles, an image placeholder, a closing band. Each surface gets ONE dominant hue world of its own: lime, sky, peach, lilac, mint, lemon, rose. Neighbouring surfaces never share the dominant hue.
- **Own light direction.** Each surface puts its light somewhere else: bottom left, top, right edge, centre. Same hue with the same light reads as a copy.
- **One brand anchor.** The brand color stays for buttons and small accents. The gradients may use neighbouring and complementary soft hues as long as they sit at the same softness.

## 2. Softness

Keep every gradient stop light: lightness around 85 to 95 percent, saturation low to medium. The base color of a surface is almost white with a tint of its hue (#f7faec, #f2f6fd, #fdf6f0, #f6f4fd). The strongest stop is a clear pastel (#e3f3a8, #d2e4fb, #fbdcc3, #dfd8fb), never a saturated color like #d3f07a or #b7d8ff across a large area.

| Business | How strong |
| --- | --- |
| Trades, practices, law, finance, driving schools | Soft, as above |
| Studios, salons, coaches, hospitality | Soft to one step clearer on one surface |
| Events, launches, youth brands | One saturated band is allowed, everything else soft |

## 3. The look

- Each field is a large radial area (50 to 90 percent of the surface) fading into a near-white base. No hard edges, no visible circles or rings.
- Fine, crisp monochrome grain on the surface background, visible at 100 percent zoom, calm from a distance. Never on the cards above it as well.
- Surfaces rounded 12 px. One full-bleed band is allowed for the closing section.
- On top, if needed: one white card (10 px radius, no shadow, no border) showing a real moment of the business. Never a fake dashboard.

## Avoid

- The same two or three hues mixed into every surface: the panels look alike however strong they are.
- Strong saturation across large areas: reads loud and cheap.
- Brown, khaki, olive, terracotta or beige as a hue world unless the brand demands it.
- Neon on black, blue-purple "AI glow", rainbow panels, gradient text, gradient buttons, gradient borders.
- Grain so strong it looks dirty, or so weak it disappears in the screenshot.

`node engine/taste-lint.mjs <files>` warns when a gradient stop is too saturated or too dark for a soft surface, and when three or more gradients share the same dominant hue.

## Recipe (React + Tailwind)

~~~jsx
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function Grain({ mesh, className = "", children }) {
  return (
    <div className={"relative isolate overflow-hidden " + className} style={{ background: mesh }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "soft-light", opacity: 0.8 }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "overlay", opacity: 0.25 }} />
      {children}
    </div>
  );
}

// The approved set from the driving-school test: one hue world and one light direction per surface.
export const MESH = {
  wash: "radial-gradient(55% 95% at 0% 45%, #eef6dc 0%, transparent 72%), radial-gradient(45% 70% at 100% 100%, #e7f2ed 0%, transparent 70%), #f8f9f6",
  lime: "radial-gradient(75% 60% at 15% 100%, #e3f3a8 0%, transparent 72%), radial-gradient(50% 50% at 90% 15%, #f2f8d8 0%, transparent 70%), #f7faec",
  sky: "radial-gradient(90% 60% at 50% 0%, #d2e4fb 0%, transparent 72%), radial-gradient(55% 55% at 100% 100%, #e6effc 0%, transparent 70%), #f2f6fd",
  peach: "radial-gradient(65% 80% at 100% 45%, #fbdcc3 0%, transparent 72%), radial-gradient(45% 55% at 0% 0%, #fdeee2 0%, transparent 70%), #fdf6f0",
  lilac: "radial-gradient(75% 75% at 0% 100%, #dfd8fb 0%, transparent 72%), radial-gradient(50% 50% at 95% 10%, #eeeafd 0%, transparent 70%), #f6f4fd",
  skyPeach: "radial-gradient(70% 70% at 90% 10%, #dbe8fb 0%, transparent 72%), radial-gradient(60% 60% at 10% 95%, #fbe6d6 0%, transparent 70%), #f8f8fb",
};
~~~

Check text contrast on the strongest field. Ink text on these surfaces, never white.
