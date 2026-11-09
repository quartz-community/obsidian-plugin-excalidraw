---
"@quartz-community/obsidian-plugin-excalidraw": patch
---

Excalidraw pages now carry the path of their drawing file (`filePath` / `relativePath`) instead of a made-up `<name>.excalidraw.md`. Base views (bases-page) list drawings with `file.path`, `file.ext` (`excalidraw`, or `md` for a drawing stored as `.excalidraw.md`), `file.folder` and `file.inFolder()` as Obsidian does, the content index records the real file path, and drawing pages get their generated social image.
