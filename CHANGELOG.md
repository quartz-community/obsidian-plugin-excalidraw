# Changelog

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
