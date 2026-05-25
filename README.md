# @quartz-community/obsidian-plugin-excalidraw

A page type plugin that renders [Obsidian Excalidraw](https://github.com/zsviczian/obsidian-excalidraw-plugin) drawings (`.excalidraw.md` and `.excalidraw` files) as full-page interactive SVG visualizations. Supports shapes, text, arrows, freedraw strokes, embedded notes with transcluded content, embedded webpages via iframe, and full dark/light theme adaptation using Excalidraw's color palette.

## Installation

```bash
npx quartz plugin add github:quartz-community/obsidian-plugin-excalidraw
```

## Usage

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/obsidian-plugin-excalidraw
    enabled: true
```

For advanced use cases, you can override in TypeScript:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins";

ExternalPlugin.ExcalidrawPage({
  enableInteraction: true,
  darkMode: "auto",
  exportPadding: 20,
});
```

## Features

- **Shapes**: Rectangles, ellipses, and diamonds rendered with roughjs hand-drawn style, respecting fill styles (hachure, cross-hatch, solid), stroke styles (solid, dashed, dotted), and roughness levels.
- **Text**: Multi-line text with Virgil (hand-drawn), Helvetica, and Cascadia font families. Supports alignment and vertical positioning.
- **Arrows and lines**: Smooth curved paths for multi-point arrows with arrowhead markers. Straight lines for two-point connections.
- **Freedraw**: Freeform strokes rendered via perfect-freehand with pressure simulation.
- **Images**: Embedded images displayed from base64 data URLs stored in the drawing.
- **Embedded notes**: Obsidian wikilink embeds (`[[note]]`) resolved and transcluded with rendered HTML content.
- **Embedded webpages**: URL embeds rendered as sandboxed iframes with title bars.
- **Dark/light mode**: Full theme support using CSS custom properties. All 65 Excalidraw palette colors have pre-computed dark-mode equivalents matching Excalidraw's own `applyDarkModeFilter` algorithm.
- **Pan and zoom**: Mouse drag to pan, scroll wheel to zoom, with zoom in/out/reset buttons.
- **Full-viewport layout**: Dedicated page frame with toggleable sidebar (matching canvas-page pattern).
- **Compressed JSON**: Supports both `json` and `compressed-json` (LZ-String) formats from the Obsidian Excalidraw plugin.
- **Filter integration**: Prevents `.excalidraw.md` files from being double-processed as regular Markdown pages.

## Configuration

| Option              | Type      | Default  | Description                                                |
| ------------------- | --------- | -------- | ---------------------------------------------------------- |
| `enableInteraction` | `boolean` | `true`   | Whether to enable pan and zoom interaction on the drawing. |
| `darkMode`          | `string`  | `"auto"` | Theme mode: `"auto"`, `"light"`, or `"dark"`.              |
| `exportPadding`     | `number`  | `20`     | Padding around the drawing content in pixels.              |

## Supported file formats

### `.excalidraw.md` (Obsidian format)

The primary format produced by the [Obsidian Excalidraw plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin). Contains YAML frontmatter, text elements section, optional embedded files section, and the drawing data in a `%%`-delimited block as either `json` or `compressed-json` (LZ-String base64).

### `.excalidraw` (Pure JSON)

Standard Excalidraw JSON format with `type`, `version`, `elements`, `appState`, and `files` fields.

## License

MIT
