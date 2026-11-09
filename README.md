# Systra Taste

**Your AI can code. Now give it taste.**

Three free, open agent skills for Claude Code, Cursor, Codex and other SKILL.md-compatible coding agents. Build more distinctive websites, review generic AI-generated UI and safely turn a working-but-forgettable layout into a stronger design.

[![skills.sh](https://skills.sh/b/systra-tools/systra-taste)](https://skills.sh/systra-tools/systra-taste)

**Not another stylesheet.** Systra Taste is a design decision workflow. It helps your agent think about composition, hierarchy, real product evidence and interaction before adding gradients, rounded cards or animation.

## Install

Use Node.js and the open Skills CLI:

```bash
# All three skills
npx skills@latest add systra-tools/systra-taste

# Just the main design skill
npx skills@latest add systra-tools/systra-taste --skill systra-taste

# Only review, without changing files
npx skills@latest add systra-tools/systra-taste --skill systra-taste-review

# Turn an existing UI into evaluated redesign options
npx skills@latest add systra-tools/systra-taste --skill systra-taste-repair
```

Choose your agent and installation scope when prompted. You can also install globally with `-g`. Read each SKILL.md before using it in a sensitive project.

## The skills

| Skill | Use when | Result |
| --- | --- | --- |
| [systra-taste](skills/systra-taste/SKILL.md) | "Build a website that doesn't look AI-generated." | A new, coherent UI implementation with a real visual idea and implementation QA |
| [systra-taste-review](skills/systra-taste-review/SKILL.md) | "Why does my landing page look generic?" | An evidence-backed, prioritized **read-only** review with specific changes |
| [systra-taste-repair](skills/systra-taste-repair/SKILL.md) | "Keep my app working but redesign its generic hero." | Distinct isolated variants, an explicit choice and verified integration |

**All three work without any Systra account.** If you're already connected to the optional [Systra Tools MCP](https://systra.tools/mcp), your agent can search real React + Tailwind components and use those as the implementation foundation. Component licensing and access rules still apply.

## Try it

**Build**
```text
Use systra-taste to build a React + Tailwind landing page for a
small architectural studio. Prioritize the work and photography.
No generic three-card SaaS layout. Keep mobile and keyboard support.
```

**Review**
```text
Use systra-taste-review on this landing page. Show the three
highest-impact problems with evidence and exact suggested fixes.
Don't edit files.
```

**Repair**
```text
Use systra-taste-repair on my existing hero. Keep its copy,
links and forms working. Show three genuinely different layouts
in an isolated preview before changing the production component.
```

The difference between *changing the colors* and *changing the design* matters. See the [illustrative hero repair](examples/hero-repair.md) and [example review](examples/review-report.md).

## Why this exists

Coding agents are good at producing plausible UI. But plausible isn't distinctive. You can end up with the same center-aligned hero, vague copy, background glow and three uniform cards, regardless of what you're building.

Systra Taste starts earlier: What is the page's job? What is the real focal subject? What should be understood in five seconds? Which parts deserve to move, and which should be quiet? Does the result hold up with real copy on a narrow screen?

Rather than a universal house style, the skills require the agent to respect **your** brand, existing components and project constraints. They prohibit copying entire reference sites or publishing third-party moodboards as original work.

## Quick comparison

| Generic design prompt | Systra Taste |
| --- | --- |
| "Make it look premium." | Identify the page's focal proof and a defensible composition. |
| "Add an elegant gradient." | Reject decoration that is hiding weak hierarchy. |
| "Use a design system." | Inspect and preserve actual project tokens and component behavior. |
| "Make three options." | Require three different composition architectures, not color swaps. |
| "Looks good!" | Render and inspect mobile, desktop and interaction states, or disclose what wasn't tested. |

## React, Tailwind, MCP

The skills are **framework-aware, not framework-locked**. They work on React, Tailwind and ordinary web projects; the agent inspects the actual stack before changing anything.

For ready-made sections, page recipes, styles and source code, see [Systra Tools](https://systra.tools/) and the [Systra MCP setup](https://systra.tools/mcp). This integration is optional. Systra Taste itself is free and does not call a paid API.

## Frequently asked questions

**Is Systra Taste a design system?** No. It's a set of decision and review processes that adapt to the current design system.

**Will it change my code automatically?** The review skill will not. The repair skill keeps experimentation isolated until a direction is selected or its implementation is explicitly requested.

**Does it require screenshots?** Real visual verification is preferred. When browser tooling is unavailable, the agent must say so instead of pretending it inspected a rendered page.

**Does installing the skill guarantee better designs?** No. Good results still depend on the model, the project, the input materials and real review. The [release criteria](skills/systra-taste/references/craft-rules.md) give the agent concrete things to verify.

**Does it require Systra premium?** No. The skills are free. Systra Tools MCP is optional and its components follow the access terms on systra.tools.

## About

Built by [Systra Studios](https://systrastudios.de/) for [Systra Tools](https://systra.tools/). Source and instructions are released under the [MIT License](LICENSE). Components and assets retrieved through the separate Systra Tools service have their own terms.

This repository contains **original Systra-authored instructions**. It isn't affiliated with Emil Kowalski or his design-engineering skills.

See [Distribution and measurement](docs/distribution.md) for a practical, no-spam launch checklist.
