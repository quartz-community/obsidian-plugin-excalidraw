---
"@quartz-community/obsidian-plugin-excalidraw": minor
---

Drawings follow the site's publish rules (quartz-community/bases-page#11). A drawing stored as Markdown (`.excalidraw.md`) gets its page only when the site's filters publish its note, and the page carries the note's frontmatter (`publish`, `draft`, `password`, …), so with Quartz 5.1 explicit-publish, drafts and encrypted-pages treat it like a note. The plugin's own filter keeps the drawing pages it generates (Quartz 5.1 runs the filters on them). A `.excalidraw` (JSON) drawing has no frontmatter: with explicit-publish it is published when a published note links to it.
