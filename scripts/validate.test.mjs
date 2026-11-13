import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = join(root, "skills");
const skillNames = ["systra-taste", "systra-taste-review", "systra-taste-repair"];
const read = (path) => readFileSync(join(root, path), "utf8");

test("three independently installable skills exist", () => {
  assert.deepEqual(readdirSync(skillRoot).filter((x) => !x.startsWith(".")).sort(), [...skillNames].sort());
  for (const name of skillNames) {
    assert.ok(existsSync(join(skillRoot, name, "SKILL.md")), name);
  }
});

test("frontmatter names and description are valid and searchable", () => {
  for (const name of skillNames) {
    const skill = read(`skills/${name}/SKILL.md`);
    assert.match(skill, /^---\nname: [a-z0-9-]+\ndescription: .+\n---\n/);
    const value = skill.match(/^name: (.+)$/m)?.[1];
    const description = skill.match(/^description: (.+)$/m)?.[1] ?? "";
    assert.equal(value, name);
    assert.ok(description.length > 90 && description.length < 550, name);
    assert.ok(skill.length > 1800, `skill ${name} has substantial instructions`);
    assert.doesNotMatch(skill, /\/Users\/|\/home\/|\.pem|AIza[0-9A-Za-z_-]{15}/);
  }
});

test("all relative reference links resolve inside each skill", () => {
  for (const name of skillNames) {
    const base = join(skillRoot, name);
    const skill = read(`skills/${name}/SKILL.md`);
    for (const [, path] of skill.matchAll(/\]\((references\/[^)#]+)(?:#[^)]+)?\)/g)) {
      const target = resolve(base, path);
      assert.ok(relative(base, target).startsWith("references/"), path);
      assert.ok(existsSync(target), `missing reference: ${name}/${path}`);
      assert.ok(statSync(target).size > 200, `empty reference: ${name}/${path}`);
    }
  }
});

test("README documents exact public install commands and optional MCP", () => {
  const readme = read("README.md");
  for (const skill of skillNames) {
    assert.ok(readme.includes(`--skill ${skill}`), `missing install instruction for ${skill}`);
  }
  assert.match(readme, /npx skills@latest add systra-tools\/systra-taste/);
  assert.match(readme, /without any Systra account/i);
  assert.match(readme, /https:\/\/systra\.tools\/mcp/);
});

test("repository contains no binary reference boards or secrets", () => {
  const allowed = new Set([".md", ".json", ".mjs", ".yml", ".gitignore", "LICENSE"]);
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === ".git" || name === "node_modules") continue;
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else {
        const extension = name === "LICENSE" ? name : name === ".gitignore" ? name : name.slice(name.lastIndexOf("."));
        assert.ok(allowed.has(extension), `unexpected file: ${path}`);
        assert.doesNotMatch(readFileSync(path, "utf8"), /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/);
      }
    }
  };
  walk(root);
});

test("public skill folders contain no photo boards or image embeddings", () => {
  const photoExt = /\.(?:png|jpe?g|webp|avif|gif|bmp|tiff?|heic|svg)$/i;
  const scan = (dir) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) {
        scan(path);
      } else {
        assert.doesNotMatch(entry, photoExt, "image bundled in skill: " + path);
        if (entry.endsWith(".md")) {
          const md = readFileSync(path, "utf8");
          assert.doesNotMatch(md, /!\[[^\]]*\]\([^)]+\)/, "embedded image in " + path);
        }
      }
    }
  };
  scan(skillRoot);
});


test("image embedding rule detects ordinary markdown images", () => {
  assert.match("![Alt text](assets/photo.jpg)", /!\[[^\]]*\]\([^)]+\)/);
});


test("Systra visual defaults, motion guidance and evaluation prompts remain linked", () => {
  const build = read("skills/systra-taste/SKILL.md");
  const review = read("skills/systra-taste-review/SKILL.md");
  const repair = read("skills/systra-taste-repair/SKILL.md");
  const visual = read("skills/systra-taste/references/visual-signature.md");
  const motion = read("skills/systra-taste/references/motion-patterns.md");
  const cases = read("examples/evaluation-cases.md");
  for (const file of ["visual-signature.md", "motion-patterns.md"]) {
    assert.ok(build.includes("references/" + file));
    assert.ok(existsSync(join(skillRoot, "systra-taste", "references", file)));
  }
  for (const term of ["em dashes", "Hugeicons", "box shadows", "corners", "Scroll motion"]) {
    assert.ok(build.includes(term), "missing build default: " + term);
  }
  for (const term of ["@hugeicons/react", "@hugeicons/core-free-icons", "aria-label", "focus outline"]) {
    assert.ok(visual.includes(term), "missing icon/accessibility detail: " + term);
  }
  for (const term of ["IntersectionObserver", "prefers-reduced-motion", "scroll", "hero-enter", "systra-media-reveal"]) {
    assert.ok(motion.includes(term), "missing motion detail: " + term);
  }
  assert.match(review, /Systra signature checks/);
  assert.match(repair, /Systra signature during repair/);
  assert.match(cases, /Case D: override and restraint/);
  assert.match(read("README.md"), /examples\/evaluation-cases.md/);
});


test("Lenis and GSAP integration is optional, linked and synchronized", () => {
  const build = read("skills/systra-taste/SKILL.md");
  const motion = read("skills/systra-taste/references/motion-patterns.md");
  const guide = read("skills/systra-taste/references/lenis-gsap.md");
  const readme = read("README.md");
  const repair = read("skills/systra-taste-repair/SKILL.md");
  const review = read("skills/systra-taste-review/SKILL.md");
  for (const value of ["GSAP", "ScrollTrigger", "Lenis", "lenis-gsap.md"]) {
    assert.ok(build.includes(value), "build skill: " + value);
  }
  assert.ok(motion.includes("[lenis-gsap.md](lenis-gsap.md)"));
  for (const value of ["autoRaf: false", "time * 1000", "gsap.ticker.add(tick)", "gsap.ticker.remove(tick)", "lenis.destroy()", "prefers-reduced-motion", "native", "optional"]) {
    assert.ok(guide.toLowerCase().includes(value.toLowerCase()), "guide: " + value);
  }
  assert.ok(readme.includes("lenis-gsap.md"));
  assert.ok(repair.includes("Lenis") && review.includes("ScrollTrigger"));
  assert.ok(read("examples/evaluation-cases.md").includes("Case E: GSAP and Lenis"));
});
