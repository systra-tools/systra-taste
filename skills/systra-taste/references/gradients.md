# Gradients: like the references, not like CSS

The target is Amelie's reference set (Parloa tiles and bands, 27.11.2026): a white page with a few colored surfaces that look like light on a material, each one its own color world, with visible grain and one white card showing a real moment.

What went wrong before, in order:

1. One sage family everywhere: too little color, every gradient the same.
2. Lime, mint and sky mixed into every panel: candy colors ("krank"), and the panels still looked alike because they mixed the same hues.
3. Soft pastels fading to near-white: calmer, but washed out and nothing like the references.
4. Accepted direction: dusky mid-tone worlds with depth, as measured from the references below.
5. Too many worlds on one page (tax office test, 27.11.): lilac band, sky and straw tiles, night band, plus photos. Each surface looked fine, the page looked restless. Accepted fix: one world for the page, the closing band in Night, tiles off-white.

## 1. What the references are made of

Colors sampled from the reference screenshots:

| World | Light corner | Body | Deep corner |
| --- | --- | --- | --- |
| Amber | #edc066 | #e2985a | #d9753a |
| Lilac | #d6c0cc | #b8a6c9 | #8d7ec0 |
| Rose | #f1c0bc | #e5a1a6 | #dc737f |
| Dusty sky | #c8dbe9 | #93b5da | #6d9fd8 |
| Straw | #ece79a | #cdc79c | #b3b178 |
| Night | #3b2c3c | #1b1418 | amber glow #8c6449 |

- **Mid-tone.** The surface is fully colored, lightness around 55 to 80 percent. Not pastel, not near-white.
- **Dusky, not candy.** Saturation is clear but never neon. Lime, mint and bright baby blue at high saturation read cheap.
- **Depth inside one world.** Every surface has a lighter corner, a body and a deeper corner of the same hue family, sometimes a neighbouring hue (amber into yellow, lilac into pink). That is what makes it look like light, not like a CSS blob.
- **Visible grain.** Fine and crisp, clearly visible at 100 percent, on the surface, never on the card above it.

## 2. On the page

- White page. One or two colored surfaces, three only on a long page: one band or signature panel in the world that suits the accent color (blue accent: dusty sky; violet: lilac; warm: amber or rose), optionally a closing band in Night. Everything else stays white or off-white.
- The reference set shows many worlds because it is many pages. One page picks one.
- Rows of tiles or cards stay off-white #F9FAFB with a white card; never give every tile its own world, never mix photo tiles and gradient tiles in one row.
- Straw next to photos reads khaki; use it only when the brand is green or yellow.
- One white card per tile (10 px radius, no shadow, no border) with a real moment of the business: a measurement, a drawing status, a booking, a message. Title and text sit below the tile, not inside it.
- Brand color stays for buttons and icons. The worlds are chosen to sit well next to it.

## Avoid

- Neon or candy stops (lime, mint, baby blue at full saturation).
- Washed-out surfaces whose darkest stop is lighter than about 80 percent.
- The same two or three hues mixed into every surface.
- More than two worlds on one page, or a gradient in every section.
- Gradient text, gradient buttons, gradient borders, blue-purple "AI glow".

`node engine/taste-lint.mjs <files>` warns about neon stops, washed-out surfaces and surfaces that look alike.

## Recipe (React + Tailwind)

~~~jsx
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function Grain({ mesh, className = "", children }) {
  return (
    <div className={"relative isolate overflow-hidden " + className} style={{ background: mesh }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "soft-light", opacity: 0.95 }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "overlay", opacity: 0.4 }} />
      {children}
    </div>
  );
}

// Worlds measured from the references: light corner, deep corner, a highlight, then the body.
export const MESH = {
  amber: "radial-gradient(70% 55% at 12% 8%, #edc066 0%, transparent 70%), radial-gradient(65% 60% at 92% 96%, #d9753a 0%, transparent 72%), radial-gradient(45% 45% at 55% 55%, #e8a95c 0%, transparent 70%), #e2985a",
  lilac: "radial-gradient(60% 50% at 18% 4%, #d6c0cc 0%, transparent 70%), radial-gradient(70% 70% at 96% 98%, #8d7ec0 0%, transparent 72%), radial-gradient(35% 80% at 48% 50%, #cbbdd6 0%, transparent 70%), #b8a6c9",
  rose: "radial-gradient(60% 60% at 98% 2%, #dc737f 0%, transparent 70%), radial-gradient(60% 60% at 0% 100%, #cf8a96 0%, transparent 72%), radial-gradient(50% 50% at 55% 50%, #f1c0bc 0%, transparent 70%), #e5a1a6",
  sky: "radial-gradient(70% 70% at 0% 0%, #6d9fd8 0%, transparent 70%), radial-gradient(70% 80% at 100% 100%, #c8dbe9 0%, transparent 72%), radial-gradient(50% 50% at 65% 30%, #a9c6e2 0%, transparent 70%), #93b5da",
  straw: "radial-gradient(60% 50% at 5% 0%, #ece79a 0%, transparent 70%), radial-gradient(60% 60% at 100% 100%, #b3b178 0%, transparent 72%), radial-gradient(50% 50% at 70% 20%, #dee3c8 0%, transparent 70%), #cdc79c",
  night: "radial-gradient(60% 50% at 20% 100%, #8c6449 0%, transparent 70%), radial-gradient(45% 40% at 62% 100%, #7f451f 0%, transparent 72%), radial-gradient(40% 40% at 8% 50%, #3b2c3c 0%, transparent 70%), #1b1418",
};
~~~

Ink text and white cards on the light worlds; white text only on Night or on a deep Amber band.
