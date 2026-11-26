# Live Systra Tools lookup

The optional remote adapter calls the official https://systra.tools/api/mcp endpoint using MCP Streamable HTTP. It initializes, searches, and retrieves one explicitly selected component. It does not access private repositories or the database.

Run from the skill folder:

```sh
node engine/mcp.mjs lookup brief.json
node engine/mcp.mjs search "pricing with three plans"
node engine/mcp.mjs source "RefillTierPricing" RefillTierPricing ./new-component
```

The lookup command maps a supported structured brief to a predefined remote query, without sending the supplied copy, prices or image paths. It filters by known category when applicable and reports the offline fallback. Choose a name actually returned by search. The source command repeats the query and checks that the selection is eligible, then saves the exact returned TSX, integration notes and an import review. The first eight eligible results are returned in server order; narrow the search if needed. Do not automatically claim the first result is the best design. Without a key only explicitly free candidates are eligible. An optional SYSTRA_MCP_KEY environment variable can be supplied by the user through their authorized setup; the server checks the real entitlement. Never read or echo other stored credentials, embed keys in URLs, retry with alternate identities or bypass a denial. Use one query and one selected source; no bulk retrieval.

Fetched components can have different dependencies, media paths, font tokens and icon systems. Review integration.md before installing or downloading anything. The adapter detects common imported icon families but does not claim to convert them. Existing Lucide imports require an actual Hugeicons migration for new Systra-style UI if the brief requires it. Use local image assets as directed by the server, and disclose AI imagery where appropriate. Do not execute retrieved code automatically. Do not put fetched library source into this public skill or redistribute it. Preview and build in an authorized project. If MCP fails or no result fits, use the offline engine or an existing project component, without pretending the remote request succeeded.

The current matcher uses remote ranking, not image-level visual evaluation. Source retrieval is not a verified render.
