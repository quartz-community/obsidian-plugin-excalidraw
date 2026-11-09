# Changelog

## 1.1.0

### Minor Changes

- afc0c41: Drawings follow the site's publish rules (quartz-community/bases-page#11). A drawing stored as Markdown (`.excalidraw.md`) gets its page only when the site's filters publish its note, and the page carries the note's frontmatter (`publish`, `draft`, `password`, …), so with Quartz 5.1 explicit-publish, drafts and encrypted-pages treat it like a note. The plugin's own filter keeps the drawing pages it generates (Quartz 5.1 runs the filters on them). A `.excalidraw` (JSON) drawing has no frontmatter: with explicit-publish it is published when a published note links to it.

## 1.0.2

### Patch Changes

- 5862c1c: Excalidraw pages now carry the path of their drawing file (`filePath` / `relativePath`) instead of a made-up `<name>.excalidraw.md`. Base views (bases-page) list drawings with `file.path`, `file.ext` (`excalidraw`, or `md` for a drawing stored as `.excalidraw.md`), `file.folder` and `file.inFolder()` as Obsidian does, the content index records the real file path, and drawing pages get their generated social image.
- 81f33ed: Bundles `@quartz-community/utils` 1.1.0: a short wikilink to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page, and anchors to headings use the same slug as heading ids. `github-slugger` is no longer a dependency of this plugin.

## 1.0.1

### Patch Changes

- dbe786c: Releases are published from GitHub Actions with npm trusted publishing, so each version on npm now carries provenance linking it to the commit and workflow that built it. No changes to the package itself.

## 1.0.0

### Major Changes

- Stable 1.0 release. All `@quartz-community/*` dependencies now use `^1.0.0` ranges.

  Pre-1.0 caret ranges pinned the minor version (`^0.2.1` means `>=0.2.1 <0.3.0`), so
  published fixes to shared packages could never be resolved by dependents. Moving the
  ecosystem to 1.0 makes caret ranges behave conventionally.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-25

### Added

- Initial release as Excalidraw page-type plugin for Quartz v5.
- Parse `.excalidraw.md` files (both `json` and `compressed-json` LZ-String formats).
- Parse `.excalidraw` pure JSON files.
- Synchronous SVG rendering using roughjs and perfect-freehand (no DOM, no native dependencies).
- Support for rectangles, ellipses, diamonds, text, arrows (curved), freedraw, images, frames, and embeddable elements.
- Embedded note transclusion via Quartz's wikilink resolver.
- Embedded webpage rendering via sandboxed iframe.
- Full dark/light mode theme support using CSS custom properties with pre-computed color mappings for all 65 Excalidraw palette colors.
- Pan and zoom interaction (mouse drag, scroll wheel, buttons).
- Full-viewport page frame with toggleable sidebar.
- Filter integration preventing `.excalidraw.md` from being double-processed as Markdown.
- 24 unit tests covering parser and renderer.
