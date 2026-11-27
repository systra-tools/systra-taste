# Crisp grain gradients: the Systra color move

Color arrives as soft mesh gradients with a fine, visible grain, on panels that sit in a white page. Think of a sheet of colored paper under studio light, not a CSS blob.

## The look

- Two to four hues that sit next to each other on the color wheel: lavender to pink to peach, sky blue to ice, lemon to lime, saffron to coral. Bright and clean, never muddy.
- Each hue is a large radial field (55 to 75 percent of the panel) that fades into the next. No hard edges, no visible circles, no rings.
- A fine monochrome grain over everything. Visible at 100 percent zoom, invisible as noise from a distance.
- Panels are rounded (16 px), full-bleed bands are allowed for one closing section.
- On top: one to three white cards (12 px radius, very soft shadow) that show a real moment of the business: a message, a price, a status, a color choice. Never a fake dashboard with invented metrics.
- One gradient family per panel. Across a row of cards each card may get its own family; that row is the color moment of the page.

## Avoid

- Brown, khaki, olive, terracotta or beige as the main hue unless the brand demands it.
- Neon on black, blue-purple "AI glow", rainbow on one panel.
- Gradient text, gradient buttons, gradient borders.
- Grain so strong it looks dirty, or so weak it disappears in the screenshot.

## Recipe (React + Tailwind)

~~~jsx
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function Grain({ mesh, className = "", children }) {
  return (
    <div className={"relative isolate overflow-hidden " + className} style={{ background: mesh }}>
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "soft-light", opacity: 0.9 }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ backgroundImage: GRAIN, mixBlendMode: "overlay", opacity: 0.32 }} />
      {children}
    </div>
  );
}

export const MESH = {
  lavender: "radial-gradient(70% 60% at 20% 15%, #bfa9ff 0%, transparent 70%), radial-gradient(65% 70% at 90% 85%, #ffc3e2 0%, transparent 72%), #dccfff",
  sky: "radial-gradient(75% 65% at 15% 10%, #5f9bff 0%, transparent 70%), radial-gradient(70% 70% at 85% 90%, #cfe6ff 0%, transparent 72%), #9cc4ff",
  lemon: "radial-gradient(70% 60% at 20% 10%, #fff27a 0%, transparent 70%), radial-gradient(70% 70% at 85% 90%, #c9e48a 0%, transparent 72%), #eef0a0",
  saffron: "radial-gradient(70% 60% at 20% 15%, #ffc04a 0%, transparent 70%), radial-gradient(70% 70% at 85% 85%, #ff6a3d 0%, transparent 72%), #ff9447",
  dawn: "radial-gradient(60% 55% at 18% 22%, #c9b6ff 0%, transparent 70%), radial-gradient(55% 60% at 85% 18%, #ffb8dc 0%, transparent 70%), radial-gradient(70% 60% at 70% 95%, #ff9a5a 0%, transparent 72%), #e9ddff",
};
~~~

Derive the hues from the brand: keep its main color as one field and pick neighbors for the others. Check text contrast on the lightest field; on bright orange or yellow use near-black text, not white.
