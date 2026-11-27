import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skillRoot = join(root, "skills");
const skillNames = ["systra-taste"];
const read = (path) => readFileSync(join(root, path), "utf8");

test("one installable Systra Taste skill exists", () => {
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

test("README introduces one skill, one current download, and optional MCP", () => {
  const readme = read("README.md");
  assert.match(readme, /npx skills@latest add systra-tools\/systra-taste/);
  assert.match(readme, /releases\/download\/v1\.3\.0\/systra-taste\.zip/);
  assert.match(readme, /without any Systra account/i);
  assert.match(readme, /https:\/\/systra\.tools\/mcp/);
  assert.doesNotMatch(readme, /systra-taste-(?:review|repair)|all three skills|three free.*skills/i);
  assert.doesNotMatch(readme, /releases\/download\/v1\.[12]\.0/);
});

test("single entry routes read-only critiques and scoped refinements", () => {
  const main = read("skills/systra-taste/SKILL.md");
  const critique = read("skills/systra-taste/references/review-workflow.md");
  const refine = read("skills/systra-taste/references/repair-workflow.md");
  const base = join(skillRoot, "systra-taste", "references");
  for (const file of ["review-workflow.md", "repair-workflow.md", "audit-checklist.md", "repair-playbook.md"]) {
    assert.ok(existsSync(join(base, file)), file);
    assert.ok(main.includes("references/" + file), file);
  }
  assert.match(main, /read-only by default/i);
  assert.match(main, /isolated previews/i);
  assert.match(critique, /read-only/i);
  assert.match(refine, /Explore/);
  assert.doesNotMatch(main, /systra-taste-(review|repair)/);
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
        assert.ok(allowed.has(extension) || (relative(root,path).startsWith("skills/systra-taste/components/") && [".jsx",".css"].includes(extension)), `unexpected file: ${path}`);
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
  const review = read("skills/systra-taste/references/review-workflow.md");
  const repair = read("skills/systra-taste/references/repair-workflow.md");
  const visual = read("skills/systra-taste/references/visual-signature.md");
  const motion = read("skills/systra-taste/references/motion-patterns.md");
  const cases = read("examples/evaluation-cases.md");
  for (const file of ["visual-signature.md", "motion-patterns.md"]) {
    assert.ok(build.includes("references/" + file) || read("skills/systra-taste/references/section-router.md").includes("](" + file + ")"));
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
  const repair = read("skills/systra-taste/references/repair-workflow.md");
  const review = read("skills/systra-taste/references/review-workflow.md");
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


test("1.4 candidate has mandatory art direction, real icons and screenshot gates", () => {
  const base = "skills/systra-taste/";
  const main = read(base + "SKILL.md");
  for (const name of ["art-direction.md", "visual-recipes.md", "release-gates.md"]) {
    assert.ok(main.includes("references/" + name) || read(base + "references/section-router.md").includes("](" + name + ")"), name);
    assert.ok(existsSync(join(root, base, "references", name)));
  }
  assert.match(main, /MUST use real \*\*Hugeicons\*\*/);
  assert.match(main, /two genuinely different composition/);
  assert.match(main, /screenshot-led correction pass/);
  const gates = read(base + "references/release-gates.md");
  for (const term of ["installed dependencies", "rendered SVG", "Unicode", "FAIL", "NOT TESTED", "correction pass", "controlled A/B"]) assert.ok(gates.includes(term), term);
  const recipes = read(base + "references/visual-recipes.md");
  for (const term of ["EditorialHero", "TextTransform", "PricingOffer", "@hugeicons/react", "@hugeicons/core-free-icons", "motion-reduce", "aria-live"]) assert.ok(recipes.includes(term), term);
  const cases = read("examples/evaluation-cases.md");
  assert.match(cases, /Case F: greenfield Hero, Workflow and Pricing/);
  assert.match(cases, /separate fresh sessions/);
  assert.match(cases, /Randomize labels/);
  assert.equal(JSON.parse(read("package.json")).version, "3.3.0");
});


test("2.0 reference-first workflow and interaction atlas are complete", () => {
  const base = "skills/systra-taste/";
  const main = read(base + "SKILL.md");
  const dna = read(base + "references/design-dna.md");
  const idx = read(base + "references/reference-index.md");
  const atlas = read(base + "references/interaction-atlas.md");
  const gates = read(base + "references/release-gates.md");
  for (const name of ["design-dna.md", "reference-index.md", "interaction-atlas.md"]) assert.ok(read(base + "references/section-router.md").includes("](" + name + ")"), name);
  for (const direction of ["Editorial", "Minimal", "Experimental", "Luxury", "Technical", "Immersive"]) assert.ok(dna.includes("| " + direction + " |"), direction);
  assert.equal(idx.split("\n").filter(l => /^\| [A-Z][A-Za-z]+ \| (Editorial|Minimal|Experimental|Luxury|Technical|Immersive) \|/.test(l)).length, 34);
  const [motion, controls] = atlas.split("## 15 control recipes");
  assert.equal((motion.match(/^\| \d+ \|/gm)||[]).length, 20);
  assert.equal((controls.match(/^\| \d+ \|/gm)||[]).length, 15);
  assert.match(gates, /Gate 0: visual reference evidence/);
  assert.match(gates, /A filename or text description alone does not count/);
  assert.match(dna, /premium source stay in their authorized environment/);
  assert.match(dna, /NOT TESTED/);
});

test("2.1 loads a bounded core and routes to four original recipes", () => {
  const base = "skills/systra-taste/";
  const core = read(base + "SKILL.md");
  const router = read(base + "references/section-router.md");
  assert.ok(Buffer.byteLength(core) < 5000);
  assert.match(core, /Read only the matching recipe/);
  assert.match(core, /Reference hunt and concept/);
  assert.match(router, /at most three modules initially/);
  assert.match(router, /Do not concatenate every reference/);
  for (const [file, component] of [["hero.md","SceneMarkers"],["process.md","SignalTransform"],["offer.md","OfferLedger"],["editorial.md","EditorialGallery"]]) {
    assert.ok(router.includes("](" + file + ")"), file);
    const recipe = read(base + "references/" + file);
    assert.ok(recipe.includes("export function " + component), component);
    assert.ok(recipe.includes("@hugeicons/react") && recipe.includes("@hugeicons/core-free-icons"));
    assert.ok(Buffer.byteLength(core + router + recipe) < 13000, file);
  }
  for (const [,file] of router.matchAll(/\]\(([^)#]+\.md)\)/g)) assert.ok(existsSync(join(root,base,"references",file)),file);
});

test("2.2 ships only original component source with scoped styles and verified routing", () => {
 const base="skills/systra-taste/";
 const core=read(base+"SKILL.md"),guide=read(base+"references/component-first.md");
 assert.ok(core.includes("references/component-first.md"));
 for(const tool of ["search_components","get_component","list_recipes","get_recipe","get_component_styled"])assert.ok(guide.includes(tool));
 assert.match(guide,/never bypass access restrictions/);
 for(const [file,name] of [["scene-hero","SceneHero"],["signal-trace","SignalTrace"],["contour-smooth","ContourSmooth"],["image-compare","ImageCompare"],["stay-selector","StaySelector"]]){
  const source=read(base+"components/"+file+".jsx");
  assert.ok(source.includes("export function "+name));
  assert.ok(source.includes("./shared.jsx"));
  assert.ok(guide.includes("../components/"+file+".jsx"));
  assert.doesNotMatch(source,/https?:\/\//);
 }
 const shared=read(base+"components/shared.jsx"),css=read(base+"components/taste.css");
 assert.match(shared,/@hugeicons\/react/);
 assert.match(shared,/@hugeicons\/core-free-icons/);
 assert.match(css,/prefers-reduced-motion/);
 assert.match(css,/focus-visible/);
 assert.match(read(base+"components/signal-trace.jsx"),/clamp\(\(v-lo\)\/\(hi-lo\|\|1\)\)/);
});

test("3.3 taste bar is linked and bundled defaults stay neutral", () => {
 const base="skills/systra-taste/";
 const core=read(base+"SKILL.md"),bar=read(base+"references/taste-bar.md"),css=read(base+"components/taste.css");
 assert.ok(core.includes("references/taste-bar.md"));
 for(const term of ["Hard rejections","9 of 10","Section roles","text-safe area","Farbe, die bleibt","gradients.md"])assert.ok(bar.includes(term),term);
 assert.ok(read(base+"references/gradients.md").includes("feTurbulence"));
 assert.doesNotMatch(css,/Instrument Serif/);
 assert.doesNotMatch(css,/#c8f26d|#587300|#f4f2e9|#edf1ec/i);
 for(const file of ["scene-hero","signal-trace","contour-smooth","image-compare","stay-selector"])assert.doesNotMatch(read(base+"components/"+file+".jsx"),/st-kicker">[A-Z]/);
});

test("taste lint flags loud gradients, dashes and slogan copy", async () => {
 const {lint,hueSpread}=await import("../skills/systra-taste/engine/taste-lint.mjs");
 const {mkdtempSync,writeFileSync}=await import("node:fs");const {tmpdir}=await import("node:os");const {join}=await import("node:path");
 assert.equal(hueSpread([10,30,350]),40);
 const dir=mkdtempSync(join(tmpdir(),"lint-"));
 const loud=join(dir,"loud.jsx");writeFileSync(loud,'const a="radial-gradient(#bfa9ff 0%, #5f9bff 50%, #fff27a 100%)";\nexport const H=()=><h1>Farbe, die bleibt.</h1>;\nconst t="Preis – fair";');
 const r=lint([loud]);
 assert.ok(r.spread>75);
 assert.ok(r.findings.some(x=>x.msg.includes("neon")));
 assert.ok(r.findings.some(x=>x.msg.includes("relative clause")));
 assert.ok(r.findings.some(x=>x.level==="error"&&x.msg.includes("dash")));
 const calm=join(dir,"calm.jsx");writeFileSync(calm,'const a="radial-gradient(#edc066 0%, transparent 70%), radial-gradient(#d9753a 0%, transparent 72%), #e2985a";\nconst b="radial-gradient(#d6c0cc 0%, transparent 70%), radial-gradient(#8d7ec0 0%, transparent 72%), #b8a6c9";\nconst c="radial-gradient(#6d9fd8 0%, transparent 70%), radial-gradient(#c8dbe9 0%, transparent 72%), #93b5da";\nexport const H=()=><h1>Schick uns ein Foto.</h1>;');
 const c=lint([calm]);assert.equal(c.findings.length,0,JSON.stringify(c.findings));
 const same=join(dir,"same.jsx");writeFileSync(same,'const a="radial-gradient(#e2985a 0%, transparent 70%), radial-gradient(#93b5da 0%, transparent 70%), #fff";\nconst b="radial-gradient(#93b5da 0%, transparent 70%), radial-gradient(#e2985a 0%, transparent 70%), #fff";\nconst c="radial-gradient(#e19c5c 0%, transparent 70%), radial-gradient(#a9c6e2 0%, transparent 70%), #fff";');
 const pale=join(dir,"pale.jsx");writeFileSync(pale,'const a="radial-gradient(#e3f3a8 0%, transparent 70%), #f7faec";');
 assert.ok(lint([pale]).findings.some(x=>x.msg.includes("washed out")));
 assert.ok(lint([same]).findings.some(x=>x.msg.includes("look alike")));
});

test("skill works without Systra Tools: offline recipe is routed and self-contained", () => {
 const base="skills/systra-taste/";
 const router=read(base+"references/section-router.md"),site=read(base+"references/service-site.md");
 assert.match(router,/works fully without Systra Tools/);
 assert.ok(router.includes("service-site.md"));
 for(const term of ["@fontsource/albert-sans","Grain","Before showing","taste-lint"])assert.ok(site.includes(term),term);
 assert.doesNotMatch(site,/search_components|search_images/);
});

test("concept step guards against the AI template look", () => {
 const base="skills/systra-taste/";
 const core=read(base+"SKILL.md"),c=read(base+"references/concept.md"),site=read(base+"references/service-site.md");
 assert.ok(core.includes("references/concept.md"));
 for(const term of ["framer.com/marketplace/search","three moves","Signature moment","AI tells","only fit this business"])assert.ok(c.includes(term),term);
 assert.match(site,/Parts, not a page/);
});

test("house rules are linked and the lint enforces them", async () => {
 const base="skills/systra-taste/";
 assert.ok(read(base+"SKILL.md").includes("references/house-rules.md"));
 const rules=read(base+"references/house-rules.md");
 for(const term of ["#F9FAFB","Hugeicons","never pills","placeholders","Never generate AI images"])assert.ok(rules.includes(term),term);
 const {lint}=await import("../skills/systra-taste/engine/taste-lint.mjs");
 const {mkdtempSync,writeFileSync}=await import("node:fs");const {tmpdir}=await import("node:os");const {join}=await import("node:path");
 const f=join(mkdtempSync(join(tmpdir(),"hr-")),"p.jsx");
 writeFileSync(f,'import { Check } from "lucide-react";\nconst s={fontFamily:"Inter, sans-serif"};\nexport const P=()=><><h1 className="text-5xl font-bold">Hi</h1><a className="rounded-full px-5 py-3" href="#">Go</a><div className="shadow-sm"/></>;');
 const msgs=lint([f]).findings.map(x=>x.msg).join("\n");
 for(const m of ["AI-typical typeface","pill button","heavy headline","Lucide","shadow or glow"])assert.ok(msgs.includes(m),m);
});
