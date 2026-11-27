#!/usr/bin/env node
// Systra taste lint: catches the patterns that make a result look generic or AI-written.
// Usage: node engine/taste-lint.mjs <file-or-dir> [...]   (jsx, tsx, js, html, css, md)
// Exit code 1 when an error is found. Warnings never fail.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const EXT = new Set([".jsx", ".tsx", ".js", ".html", ".css", ".astro", ".vue", ".svelte"]);
const SKIP = new Set(["node_modules", ".git", "dist", "build", ".next"]);

export function collect(paths) {
  const out = [];
  const walk = (p) => {
    const st = statSync(p);
    if (st.isDirectory()) { for (const n of readdirSync(p)) if (!SKIP.has(n)) walk(join(p, n)); }
    else if (EXT.has(extname(p))) out.push(p);
  };
  paths.forEach(walk);
  return out;
}

function hue(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (s < 0.25 || l > 0.94 || l < 0.08) return null; // near-neutral colors do not count as a hue
  let hh = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (hh * 60 + 360) % 360;
}

// gradient checks calibrated on Amelie's reference screenshots (Parloa) and her four rounds on 27.11.2026
export function hsl(hex) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return { s, l };
}
// candy or neon: very saturated and light at the same time (lime #d3f07a, sky #b7d8ff were rejected as "krank")
export const isNeon = (hex) => { const { s, l } = hsl(hex); return s > 0.78 && l > 0.68; };

const bucket = (h) => Math.round(h / 30) % 12;

// smallest arc of the color wheel that contains every hue
export function hueSpread(hues) {
  if (hues.length < 2) return 0;
  const s = [...hues].sort((a, b) => a - b);
  let gap = 360 - s[s.length - 1] + s[0];
  for (let i = 1; i < s.length; i++) gap = Math.max(gap, s[i] - s[i - 1]);
  return Math.round(360 - gap);
}

const TEXT_RULES = [
  [/[–—]/, "error", "Gedankenstrich (en or em dash) in text"],
  [/\b(Inter|Geist|Poppins|Space Grotesk|Playfair Display)\b["',]/, "error", "AI-typical typeface; use Albert Sans, Hanken Grotesk or Manrope"],
  [/\b(Instrument Serif|Playfair|Cormorant|DM Serif|Fraunces)\b|\bfont-serif\b/, "warn", "serif face; only when it fits the brand"],
  [/font-mono[^"'`]*uppercase|uppercase[^"'`]*font-mono/, "warn", "uppercase mono label; use the body face and not above every section"],
  [/className=["'`][^"'`]*\brounded[^"'`]*\bborder\b(?!-0)|className=["'`][^"'`]*\bborder\b(?!-0)[^"'`]*\brounded/, "warn", "border on a rounded card or pill"],
  [/\b(?:drop-)?shadow-(?!none\b)[a-z0-9[]/, "warn", "shadow or glow; the house rule is none at all"],
  [/<(?:button|a|motion\.button|motion\.a)\b[^>]*\brounded-full\b/, "warn", "pill button; use 5 to 10 px or an underline link"],
  [/<h[1-3]\b[^>]*\bfont-(semibold|bold|extrabold|black)\b|\btext-([5-9]xl|\[[4-9]\dpx\])[^"'`]*\bfont-(semibold|bold|extrabold|black)\b/, "warn", "heavy headline weight; keep 300 to 400, at most 500"],
  [/from ["']lucide-react["']/, "warn", "Lucide icons mark AI pages; use Hugeicons (engine/icons.mjs converts)"],
  [/bg-clip-text[^"'`]*(gradient|from-)|(gradient|from-)[^"'`]*bg-clip-text/, "warn", "gradient text"],
  [/lorem ipsum/i, "error", "placeholder text"],
];

// German and English copy patterns that read as AI-written
const COPY_RULES = [
  [/(^|[>"'`]\s*)[A-ZÄÖÜ][a-zäöüß]+, (die|der|das) [a-zäöüß]+(\s[a-zäöüß]+)?\./, "copy: slogan built as noun, comma, relative clause"],
  [/Bereit für [^?]{2,40}\?/, "copy: 'Bereit für ...?' invitation"],
  [/Lass(t)? uns gemeinsam/, "copy: 'Lass uns gemeinsam'"],
  [/Nicht nur [^.]{2,60}, sondern/, "copy: 'Nicht nur X, sondern Y'"],
  [/\bVom [A-ZÄÖÜ]\w+ zu[rm]? /, "copy: 'Vom X zum Y'"],
  [/\b(ganzheitlich\w*|maßgeschneidert\w*|Mehrwert|innovativ\w*|Leidenschaft|authentisch\w*|nachhaltig\w*|Lösungen, die)\b/i, "copy: buzzword"],
  [/Erzähl(t)? uns von/, "copy: 'Erzähl uns von ...' invitation"],
  [/\b(Unlock|Elevate|Seamless|Empower|Transform your)\b/, "copy: English buzzword"],
  [/„[^“"]{1,200}"/, "copy: German quote opened with „ must close with “"],
];

export function lint(files) {
  const findings = [];
  const gradientHues = [];
  const surfaces = [];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return; // comments are fine
      for (const [re, level, msg] of TEXT_RULES) if (re.test(line)) findings.push({ f, line: i + 1, level, msg });
      for (const [re, msg] of COPY_RULES) if (re.test(line)) findings.push({ f, line: i + 1, level: "warn", msg });
    });
    // every string that holds gradients is one surface
    for (const lit of src.matchAll(/(["'`])((?:(?!\1).)*?gradient\((?:(?!\1).)*)\1/g)) {
      const stops = [...lit[2].matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)].map((c) => c[0]);
      const hues = new Set();
      let top = null;
      for (const c of stops) {
        const h = hue(c); if (h === null) continue;
        gradientHues.push(h); hues.add(bucket(h));
        const { l } = hsl(c); if (!top || l < top.l) top = { l, h, c };
      }
      const neon = stops.find((c) => hue(c) !== null && isNeon(c));
      if (top) surfaces.push({ f, hues, dom: bucket(top.h), top, neon });
    }
  }
  for (const x of surfaces) {
    if (x.neon) findings.push({ f: x.f, line: 0, level: "warn", msg: `gradient stop ${x.neon} reads as candy or neon; use a dusky mid-tone like the references (see gradients.md)` });
    if (x.top.l > 0.8) findings.push({ f: x.f, line: 0, level: "warn", msg: `gradient surface is washed out (darkest stop ${x.top.c}); the references are mid-tone with depth (see gradients.md)` });
  }
  const worlds = new Set(surfaces.map((x) => x.dom)).size;
  if (worlds > 2) findings.push({ f: "(page)", line: 0, level: "warn", msg: `${worlds} gradient worlds on one page; use one world plus an optional Night band, tiles off-white (see gradients.md)` });
  if (surfaces.length >= 3) {
    let sim = 0, n = 0;
    for (let i = 0; i < surfaces.length; i++) for (let j = i + 1; j < surfaces.length; j++) {
      const a = surfaces[i].hues, b = surfaces[j].hues;
      const inter = [...a].filter((v) => b.has(v)).length, uni = new Set([...a, ...b]).size;
      sim += uni ? inter / uni : 0; n++;
    }
    const doms = new Set(surfaces.map((x) => x.dom)).size;
    if (sim / n > 0.4 || doms < Math.ceil(surfaces.length / 2)) findings.push({ f: "(page)", line: 0, level: "warn", msg: "gradients look alike; give every surface its own hue world and light direction" });
  }
  const spread = hueSpread(gradientHues);
  return { findings, spread };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  if (!args.length) { console.error("usage: node engine/taste-lint.mjs <file-or-dir> [...]"); process.exit(2); }
  const { findings, spread } = lint(collect(args));
  for (const x of findings) console.log(`${x.level.toUpperCase()} ${x.f}${x.line ? ":" + x.line : ""} ${x.msg}`);
  console.log(`taste-lint: ${findings.filter((x) => x.level === "error").length} errors, ${findings.filter((x) => x.level === "warn").length} warnings, gradient hue spread ${spread} degrees`);
  process.exit(findings.some((x) => x.level === "error") ? 1 : 0);
}
