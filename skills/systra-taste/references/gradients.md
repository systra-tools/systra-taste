# Grain gradients: color that fits the brand

Color arrives as soft mesh gradients with a fine, visible grain, on panels inside a white page. How much color depends on the brand. A painter in Münster is not a festival.

## 1. Pick one family from the brand

Take the brand's main color. Build ONE family around it: that hue plus one or two neighbors within about 60 degrees on the color wheel, plus a near-white of the same hue. Every gradient on the page comes from this family. Different cards get different light positions and mixes of the same family, not different hues.

Examples of families: apricot (peach, apricot, soft coral), lavender (lilac, pink, pale violet), sky (blue, ice, pale cyan), lemon (yellow, pale lime, cream), sage only when the brand is green.

A second family is allowed only when the brand itself has two colors, and then for one element at most.

## 2. Pick the intensity from the business

| Level | Looks like | Fits |
| --- | --- | --- |
| Calm | Near-white with a faint tint, fields at 15 to 30 percent saturation | Trades, medical, law, finance, care, most local service businesses |
| Medium | Clear pastel fields, white cards stand out | Studios, coaches, salons, hospitality, consumer brands |
| Vivid | Saturated fields, strong contrast | Creative agencies, events, launches, youth brands |

Default to Calm for service businesses. Use at most ONE moment one level above the page default (usually the hero panel or the closing band). Most sections stay white.

## 3. The look

- Each field is a large radial area (55 to 75 percent of the panel) fading into the next. No hard edges, no visible circles or rings.
- Fine monochrome grain over everything: visible at 100 percent zoom, calm from a distance.
- Panels rounded 16 px. One full-bleed band is allowed for the closing section.
- On top: one to three white cards (12 px radius, very soft shadow) showing a real moment of the business: a message, a price, a status, a choice. Never a fake dashboard with invented metrics.

## Avoid

- A different hue per card in a row of services. That reads as a candy box.
- Brown, khaki, olive, terracotta or beige as the main hue unless the brand demands it.
- Neon on black, blue-purple "AI glow", rainbow panels.
- Gradient text, gradient buttons, gradient borders.
- Grain so strong it looks dirty, or so weak it disappears in the screenshot.

`node engine/taste-lint.mjs <files>` reports a hue spread above 75 degrees across all gradients on a page.

## Recipe (React + Tailwind)

~~~jsx
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function Grain({ mesh, className = "", children }) {
  return (
    <div className={"relative isolate overflow-hidden " + className} style={{ background: mesh }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "soft-light", opacity: 0.9 }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "overlay", opacity: 0.3 }} />
      {children}
    </div>
  );
}

// One family (apricot), three intensities. Vary the "at x% y%" positions per card.
export const APRICOT = {
  calm: "radial-gradient(70% 60% at 20% 15%, #ffe6d6 0%, transparent 70%), radial-gradient(65% 70% at 90% 85%, #ffd9c7 0%, transparent 72%), #fff6f0",
  medium: "radial-gradient(65% 60% at 18% 20%, #ffd0b5 0%, transparent 70%), radial-gradient(60% 65% at 85% 85%, #ffb79a 0%, transparent 72%), #ffeadd",
  vivid: "radial-gradient(60% 60% at 15% 25%, #ffb27a 0%, transparent 70%), radial-gradient(60% 65% at 85% 20%, #ff7a52 0%, transparent 70%), #ff9a66",
};
~~~

Check text contrast on the lightest field. On Vivid orange or yellow use near-black text, not white.
