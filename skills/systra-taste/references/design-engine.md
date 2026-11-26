# Design Engine 3.0 (candidate)

Use a small structured brief instead of generating the whole section again. First inspect the current project. When a fitting existing component exists, reuse it. When the authorized Systra Tools MCP is connected, use the actual search_components and get_component tools to inspect matching source under permitted access. The engine does not call MCP itself or claim a remote match; its plan contains a suggested search query. Never bypass account permissions. For the offline fallback, run the dependency-free Node CLI in this skill.

From the skill directory:

```sh
node engine/engine.mjs plan brief.json
node engine/engine.mjs build brief.json ./new-section
```

Use Node 20+. The destination must not exist and its parent must exist. The generated Section.jsx, theme.css, source files and plan.json are ready to integrate into a React project with the required dependencies. Images are supplied by the project, not copied or fetched. No project modification, dependency installation, publication or network access is performed by the engine.

Example:

```json
{"job":"geometry","props":{"title":"Make every edge count.","description":"Explore the outline.","points":[[32,89],[56,34],[105,21],[169,34],[194,112]]},"theme":{"--paper":"#f4f1ea","--ink":"#242424","--display":"Instrument Serif, Georgia, serif"}}
```

Jobs: hero, signal, geometry, comparison, pricing. Use the explicit job if known; otherwise supply a brief string for simple English/German keyword matching. Ties or unsupported jobs return no-match instead of forcing a template. Missing inputs and invalid values return needs-input; complete actual data before building. The five local components are limited, not a general design generator. The query is only a hint for an authorized agent; inspect actual remote results and never treat the hint as a verified component.

Supported theme tokens: --paper, --ink, --muted, --surface (six-digit hex); --display, --body, --mono (font-family names). These apply to the component root, and some internal fixed colors remain intentionally unchanged until adapted. Geometry and signal colors are not fully themeable yet. Validate local assets, genuine icon exports, contrast and actual behavior in the target project. Keep existing source intact; make minimal changes if necessary. Do not claim a successful render until one actually occurs.
