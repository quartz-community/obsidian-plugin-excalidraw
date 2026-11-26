---
"@quartz-community/obsidian-plugin-excalidraw": patch
---

Bundles `@quartz-community/utils` 1.3, so `configuration.slugs.stripDiacritics` (Quartz 5.3) also applies to links and embedded images in drawings. Before, the plugin bundled an older utils that ignored the option, and its slugs kept their diacritics.
