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
  [/\b(Instrument Serif|Playfair|Cormorant|DM Serif|Fraunces)\b/, "warn", "serif display face; Systra default is Albert Sans alone"],
  [/font-mono[^"'`]*uppercase|uppercase[^"'`]*font-mono/, "warn", "uppercase mono kicker"],
  [/className=["'`][^"'`]*\brounded[^"'`]*\bborder\b(?!-0)|className=["'`][^"'`]*\bborder\b(?!-0)[^"'`]*\brounded/, "warn", "border on a rounded card or pill"],
  [/\bshadow-(lg|xl|2xl)\b/, "warn", "heavy shadow; keep shadows very soft"],
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
];

export function lint(files) {
  const findings = [];
  const gradientHues = [];
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(line)) return; // comments are fine
      for (const [re, level, msg] of TEXT_RULES) if (re.test(line)) findings.push({ f, line: i + 1, level, msg });
      for (const [re, msg] of COPY_RULES) if (re.test(line)) findings.push({ f, line: i + 1, level: "warn", msg });
    });
    for (const m of src.matchAll(/(?:radial|linear|conic)-gradient\(([^;"`]*)/g))
      for (const c of m[1].matchAll(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g)) { const h = hue(c[0]); if (h !== null) gradientHues.push(h); }
  }
  const spread = hueSpread(gradientHues);
  if (spread > 75) findings.push({ f: "(page)", line: 0, level: "warn", msg: `gradient hues span ${spread} degrees; use one family derived from the brand (max about 60)` });
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
