---
"@quartz-community/obsidian-plugin-excalidraw": patch
---

fix: the sidebar toggle stopped working after SPA navigation. The toggle and the zoom-in/out/reset buttons now remove their click listeners on navigation, so they no longer pile up on the reused elements.
