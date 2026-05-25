# Excalidraw Page-Type Plugin for Quartz

## Overview

Transform the plugin template at `~/Repos/obsidian-plugin-excalidraw` into a page-type + filter plugin that renders Obsidian Excalidraw drawings (`.excalidraw.md` and `.excalidraw` files) as interactive pages in Quartz.

**Package name:** `@quartz-community/obsidian-plugin-excalidraw`

## Architecture Decisions

### Rendering Strategy: Synchronous roughjs-based SVG

Quartz's `PageGenerator` returns `VirtualPage[]` synchronously (no async). Body components also render synchronously via `preact-render-to-string`. Therefore:

- **Phase 1 (MVP):** Static SVG rendered synchronously in `generate()` using a roughjs-based renderer (ported from `@moona3k/excalidraw-export` patterns, MIT). Dependencies: `roughjs` (pure JS math) + `perfect-freehand` (freedraw paths). No DOM, no async, no native binaries.

- **Phase 2 (Enhancement):** Client-side interactive mode using `@excalidraw/excalidraw` (~500KB, loaded per-page via Quartz's chunked bundling). Progressive enhancement: static SVG first, interactive viewer hydrates on top.

### Filter Strategy: Multi-Category Plugin

The plugin registers as `["pageType", "filter", "component"]`. The single factory function returns an object with both `generate`/`match`/`body`/`layout` (pageType hooks) AND `shouldPublish` (filter hook). This prevents `.excalidraw.md` files from being double-processed through the markdown pipeline.

### Image Resolution: Quartz Wikilink Utilities

Embedded image references (`[[image.png]]`) are resolved using `@quartz-community/utils/path`:

- `slugifyFilePath()` converts the wikilink target to a slug
- `resolveRelative()` produces the relative URL from the current page

### Layout: Full-Viewport with Sidebar

Same pattern as canvas-page: `ExcalidrawFrame` provides full-viewport layout with sidebar toggle, allowing drawings to use maximum screen real estate.

---

## File Format Support

### `.excalidraw.md` (Obsidian format — PRIMARY)

Structure:

````
---
excalidraw-plugin: parsed
tags: [excalidraw]
---

==⚠  Switch to EXCALIDRAW VIEW...==

# Text Elements
<text content> ^<element-id>

# Embedded files
<file-hash>: [[<obsidian-link>]]

%%
# Drawing
```json
{ "type": "excalidraw", "version": 2, "elements": [...], "appState": {...}, "files": {} }
````

%%

````

**Parser note:** The JSON is inside a fenced code block (` ```json ... ``` `) within the `%%` comment delimiters. The parser must find the `%%` pair, then extract the code fence content inside.

### `.excalidraw` (Pure JSON — SECONDARY)

Standard Excalidraw JSON: `{ type, version, source, elements, appState, files }`.

### Parser Strategy

Both formats produce the same intermediate `ExcalidrawData` structure. The parser:
1. Detects format by extension (`.excalidraw.md` vs `.excalidraw`)
2. For `.excalidraw.md`: finds `%%` delimiters, extracts JSON from code fence within
3. For `.excalidraw`: parses entire file as JSON
4. Resolves embedded file references (`# Embedded files` section → image hash mapping)
5. Filters deleted elements (`isDeleted: true`)
6. Returns normalized `ExcalidrawData` with elements, appState, and files

---

## Implementation Plan

### Phase 1: Core Page-Type + Filter Plugin (MVP)

#### Step 1.0: Remove Template Artifacts

**Files to delete:**
- `src/transformer.ts`
- `src/filter.ts`
- `src/emitter.ts`
- `src/components/ExampleComponent.tsx`
- `src/components/scripts/example.inline.ts`
- `src/components/styles/example.scss`
- `test/transformer.test.ts`
- `test/filter.test.ts` (if exists)
- `test/emitter.test.ts` (if exists)

**Files to update:**
- `src/index.ts` — Clear all example exports
- `src/components/index.ts` — Clear ExampleComponent export

#### Step 1.1: Package Configuration

**Files to modify:**
- `package.json` — Full rewrite of metadata, dependencies, quartz manifest
- `tsup.config.ts` — Add `frames/index` entry point

**package.json changes:**
```json
{
  "name": "@quartz-community/obsidian-plugin-excalidraw",
  "description": "Excalidraw page type plugin for Quartz v5. Renders Obsidian Excalidraw drawings as interactive SVG pages.",
  "repository": {
    "type": "git",
    "url": "https://github.com/quartz-community/obsidian-plugin-excalidraw"
  },
  "keywords": ["quartz", "quartz-plugin", "excalidraw", "obsidian", "page-type", "svg"],
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./types": { "types": "./dist/types.d.ts", "import": "./dist/types.js" },
    "./components": { "types": "./dist/components/index.d.ts", "import": "./dist/components/index.js" },
    "./frames": { "types": "./dist/frames/index.d.ts", "import": "./dist/frames/index.js" },
    "./package.json": "./package.json"
  },
  "peerDependencies": {
    "preact": "^10.0.0"
  },
  "dependencies": {
    "@quartz-community/types": "github:quartz-community/types",
    "@quartz-community/utils": "github:quartz-community/utils",
    "roughjs": "^4.6.6",
    "perfect-freehand": "^1.2.2",
    "github-slugger": "^2.0.0"
  },
  "quartz": {
    "name": "obsidian-plugin-excalidraw",
    "displayName": "Excalidraw",
    "category": ["pageType", "filter", "component"],
    "version": "1.0.0",
    "quartzVersion": ">=5.0.0",
    "defaultOptions": {
      "enableInteraction": true,
      "darkMode": "auto",
      "exportPadding": 20
    },
    "optionSchema": {
      "enableInteraction": { "type": "boolean" },
      "darkMode": { "type": "enum", "values": ["auto", "light", "dark"] },
      "exportPadding": { "type": "number" }
    },
    "frames": {
      "ExcalidrawFrame": { "exportName": "ExcalidrawFrame" }
    }
  }
}
````

**tsup.config.ts changes:**

- Add entry point: `"frames/index": "src/frames/index.ts"`
- Ensure `roughjs` and `perfect-freehand` are NOT in singleton externals (they should be bundled)

#### Step 1.2: Type Definitions

**Files to modify:**

- `src/types.ts` — Plugin option types + Excalidraw data types

```typescript
export interface ExcalidrawPageOptions {
  enableInteraction?: boolean;
  darkMode?: "auto" | "light" | "dark";
  exportPadding?: number;
}

export interface ExcalidrawData {
  type: "excalidraw";
  version: number;
  source?: string;
  elements: ExcalidrawElement[];
  appState: Partial<ExcalidrawAppState>;
  files: Record<string, ExcalidrawFileData>;
  /** Parsed from # Embedded files section — maps hash → wikilink target */
  embeddedFiles?: Record<string, string>;
}

export interface ExcalidrawElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: string;
  strokeWidth: number;
  strokeStyle: string;
  roughness: number;
  opacity: number;
  seed: number;
  isDeleted: boolean;
  roundness: { type: number; value?: number } | null;
  points?: Array<[number, number]>; // For lines/arrows
  text?: string; // For text elements
  fontSize?: number;
  fontFamily?: number;
  fileId?: string; // For image elements
  [key: string]: unknown;
}

export interface ExcalidrawAppState {
  viewBackgroundColor: string;
  exportBackground: boolean;
  exportWithDarkMode: boolean;
  [key: string]: unknown;
}

export interface ExcalidrawFileData {
  mimeType: string;
  id: string;
  dataURL: string;
  created: number;
}
```

#### Step 1.3: Parser Module

**Files to create:**

- `src/parser.ts`

**Functions:**

```typescript
/**
 * Parse .excalidraw.md format.
 * Finds %% delimiters, extracts JSON from code fence within.
 * Also parses # Embedded files section for image hash → wikilink mapping.
 */
export function parseExcalidrawMd(content: string): ExcalidrawData | null;

/**
 * Parse pure .excalidraw JSON format.
 */
export function parseExcalidrawJson(content: string): ExcalidrawData | null;

/**
 * Route to appropriate parser based on file extension.
 */
export function parseExcalidraw(content: string, filePath: string): ExcalidrawData | null;
```

**Implementation details:**

1. For `.excalidraw.md`:
   - Find first `%%` after `# Drawing` heading
   - Find closing `%%`
   - Within that block, extract content between ` ```json ` and ` ``` ` (or parse raw JSON if no code fence)
   - Parse `# Embedded files` section: regex `^([a-f0-9]+):\s+\[\[(.+?)\]\]$` per line
   - Store embedded files mapping in `data.embeddedFiles`
2. For `.excalidraw`: `JSON.parse(content)`, validate `type === "excalidraw"`
3. Both: filter `elements.filter(el => !el.isDeleted)`, default `appState` if missing

**Edge cases:**

- Malformed JSON → return `null`, log warning
- Missing `%%` delimiters → return `null`
- Empty elements array → valid, render empty state
- Missing `appState` → use `{ viewBackgroundColor: "#ffffff", exportBackground: true }`
- Files with `excalidraw-plugin: raw` (unprocessed) → attempt JSON extraction anyway

#### Step 1.4: SVG Renderer (Synchronous)

**Files to create:**

- `src/renderer.ts` — Synchronous SVG renderer using roughjs

**Strategy:** Port the rendering approach from `@moona3k/excalidraw-export` (MIT). Uses `rough.generator()` which is purely synchronous math — no DOM, no canvas, no async.

```typescript
import rough from "roughjs";
import { getStroke } from "perfect-freehand";

const gen = rough.generator();

/**
 * Render ExcalidrawData to an SVG string. Fully synchronous.
 */
export function renderToSvg(data: ExcalidrawData, opts: ExcalidrawPageOptions): string {
  const elements = data.elements.filter((el) => !el.isDeleted);
  const bbox = computeBoundingBox(elements);
  const padding = opts.exportPadding ?? 20;
  // ... compute viewBox, iterate elements, generate SVG paths
  // Returns complete <svg>...</svg> string
}
```

**Element rendering:**

- `rectangle`, `ellipse`, `diamond` → `gen.rectangle()`, `gen.ellipse()`, `gen.path()` → SVG paths
- `line`, `arrow` → `gen.linearPath()` / `gen.path()` + arrowhead markers
- `text` → `<text>` SVG element with font-family, size, alignment
- `freedraw` → `getStroke()` from `perfect-freehand` → SVG path
- `image` → `<image>` element with base64 dataURL from `data.files[el.fileId]`
- `frame` → `<rect>` with clip-path for contained elements

**Font handling:**

- Excalidraw uses 3 font families: Virgil (hand-drawn), Helvetica, Cascadia (code)
- Embed Virgil as base64 `@font-face` in SVG `<defs>` (following `@moona3k/excalidraw-export` pattern)
- Helvetica/Cascadia reference system fonts (available on most systems)

**Color/style mapping:**

- Map `fillStyle` (hachure, cross-hatch, solid) to roughjs options
- Map `strokeStyle` (solid, dashed, dotted) to SVG `stroke-dasharray`
- Map `roughness` (0, 1, 2) to roughjs roughness parameter
- Apply `opacity` via SVG `opacity` attribute
- Pass `seed` to roughjs for deterministic rendering

#### Step 1.5: Page-Type + Filter Plugin Registration

**Files to create:**

- `src/pageType.ts`

**Implementation:**

```typescript
import type {
  QuartzPageTypePlugin,
  PageMatcher,
  FullSlug,
  VirtualPage,
} from "@quartz-community/types";
import { slugifyFilePath } from "@quartz-community/utils/path";
import { readFileSync } from "fs";
import { join } from "path";
import { parseExcalidraw } from "./parser";
import { renderToSvg } from "./renderer";
import ExcalidrawBody from "./components/ExcalidrawBody";
import type { ExcalidrawPageOptions } from "./types";

const excalidrawMatcher: PageMatcher = ({ fileData }) => {
  return "excalidrawData" in fileData;
};

export const ExcalidrawPage: QuartzPageTypePlugin<ExcalidrawPageOptions> = (opts) => ({
  name: "ExcalidrawPage",
  priority: 25, // Higher than canvas (20) — runs first, important because .excalidraw.md ends in .md
  fileExtensions: [".excalidraw.md", ".excalidraw"],
  match: excalidrawMatcher,

  generate({ ctx }) {
    const excalidrawFiles = ctx.allFiles.filter(
      (fp) => fp.endsWith(".excalidraw.md") || fp.endsWith(".excalidraw"),
    );

    const virtualPages: VirtualPage[] = [];

    for (const filePath of excalidrawFiles) {
      const fullPath = join(ctx.argv.directory, filePath);
      let content: string;
      try {
        content = readFileSync(fullPath, "utf-8");
      } catch {
        continue;
      }

      const data = parseExcalidraw(content, filePath);
      if (!data) continue;

      const svgContent = renderToSvg(data, opts ?? {});
      const baseName =
        filePath
          .replace(/\.excalidraw\.md$/, "")
          .replace(/\.excalidraw$/, "")
          .split("/")
          .pop() ?? "Excalidraw Drawing";
      const slug = slugifyFilePath(filePath) as FullSlug;

      virtualPages.push({
        slug,
        title: baseName,
        data: {
          frontmatter: { title: baseName, tags: ["excalidraw"] },
          excalidrawData: data,
          excalidrawSvg: svgContent,
          excalidrawOptions: opts,
        },
      });
    }

    return virtualPages;
  },

  // Filter hook: prevent .excalidraw.md from being processed as regular markdown
  shouldPublish(_ctx, content) {
    const slug = content[1].data.slug ?? "";
    const relativePath = content[1].data.relativePath ?? "";
    // Filter out files that end in .excalidraw.md or .excalidraw
    if (relativePath.endsWith(".excalidraw.md") || relativePath.endsWith(".excalidraw")) {
      return false;
    }
    return true;
  },

  layout: "excalidraw",
  frame: "excalidraw",
  body: ExcalidrawBody,
});
```

**Note on priority:** Priority 25 (higher than canvas-page's 20) ensures Excalidraw files are matched before content-page could accidentally claim them.

#### Step 1.6: Body Component

**Files to create:**

- `src/components/ExcalidrawBody.tsx`
- `src/components/index.ts`
- `src/components/styles/excalidraw.scss`
- `src/components/scripts/excalidraw.inline.ts`

**ExcalidrawBody.tsx:**

```tsx
import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types";
import type { ExcalidrawData, ExcalidrawPageOptions } from "../types";
import style from "./styles/excalidraw.scss";
import script from "./scripts/excalidraw.inline.ts";

export default ((userOpts?: ExcalidrawPageOptions) => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData } = props;
    const svgContent = fileData.excalidrawSvg as string;
    const data = fileData.excalidrawData as ExcalidrawData;
    const options = fileData.excalidrawOptions as ExcalidrawPageOptions;

    return (
      <article
        class="excalidraw-page"
        role="img"
        aria-label={fileData.frontmatter?.title ?? "Excalidraw drawing"}
      >
        <div class="excalidraw-controls">
          <button class="excalidraw-zoom-in" type="button" aria-label="Zoom in">
            +
          </button>
          <button class="excalidraw-zoom-out" type="button" aria-label="Zoom out">
            −
          </button>
          <button class="excalidraw-reset" type="button" aria-label="Reset view">
            ⟲
          </button>
        </div>
        <div class="excalidraw-container" dangerouslySetInnerHTML={{ __html: svgContent }} />
        {options?.enableInteraction && (
          <script
            type="application/json"
            class="excalidraw-data"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                elements: data.elements,
                appState: data.appState,
                files: data.files,
              }),
            }}
          />
        )}
      </article>
    );
  };

  Component.css = style;
  Component.afterDOMLoaded = script;

  return Component;
}) satisfies QuartzComponentConstructor;
```

**Key design decisions:**

- SVG inlined directly via `dangerouslySetInnerHTML` (renders without JS)
- Excalidraw data stored in `<script type="application/json">` (not data attributes — avoids multi-MB HTML attributes for large drawings)
- `role="img"` and `aria-label` for accessibility
- Controls rendered in HTML (functional via inline script)

**excalidraw.inline.ts (Phase 1 — pan/zoom on SVG):**

- Listen to `nav` event for SPA navigation
- Pan via mouse drag on `.excalidraw-container`
- Zoom via scroll wheel (respecting min/max)
- Zoom in/out/reset buttons
- `window.addCleanup()` for proper event listener cleanup
- Respect `prefers-color-scheme` for theme

**excalidraw.scss:**

- Full-height container
- SVG fills container, preserves aspect ratio
- Control buttons positioned absolutely
- Cursor: grab (idle) / grabbing (dragging)
- Smooth zoom transitions

#### Step 1.7: Frame Component

**Files to create:**

- `src/frames/ExcalidrawFrame.tsx`
- `src/frames/index.ts`

**ExcalidrawFrame.tsx** — based on CanvasFrame pattern:

```tsx
import type { PageFrame, PageFrameProps } from "@quartz-community/types";

export const ExcalidrawFrame: PageFrame = {
  name: "excalidraw",
  css: `
.page[data-frame="excalidraw"] {
  max-width: none;
  margin: 0;
  min-height: 100vh;
}
.page[data-frame="excalidraw"] > #quartz-body {
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  grid-template-areas: "grid-center";
  height: 100vh;
  padding: 0;
}
.page[data-frame="excalidraw"] > #quartz-body > .center.excalidraw-frame {
  max-width: 100%;
  min-width: 100%;
  height: 100%;
  margin: 0;
}
`,
  render({ componentData, pageBody: Content, left }: PageFrameProps): unknown {
    // Sidebar toggle + drawing stage (same pattern as CanvasFrame)
  },
};
```

#### Step 1.8: Entry Point & Exports

**Files to modify:**

- `src/index.ts`

```typescript
export { ExcalidrawPage } from "./pageType";
export { default as ExcalidrawBody } from "./components/ExcalidrawBody";
export { ExcalidrawFrame } from "./frames/ExcalidrawFrame";
export type { ExcalidrawPageOptions, ExcalidrawData, ExcalidrawElement } from "./types";
```

#### Step 1.9: Build Configuration

**Files to modify:**

- `tsup.config.ts`

**Changes:**

- Add `"frames/index": "src/frames/index.ts"` to entry points
- Ensure `roughjs` and `perfect-freehand` are bundled (NOT in singleton externals)
- Keep existing inline-script-loader and scss compilation plugins
- Remove any template-specific example entries

#### Step 1.10: i18n

**Files to modify:**

- `src/i18n/locales/en-US.ts`

No i18n strings needed for Phase 1. The only UI text is in control buttons which use universal symbols (+, −, ⟲). Keep the i18n structure in place for future use.

#### Step 1.11: Tests

**Files to create:**

- `test/parser.test.ts`
- `test/renderer.test.ts`
- `test/pageType.test.ts`

**Test fixtures to create:**

- `test/fixtures/simple.excalidraw` — Pure JSON with basic shapes
- `test/fixtures/simple.excalidraw.md` — Obsidian format with text + shapes
- `test/fixtures/with-images.excalidraw.md` — With embedded file references
- `test/fixtures/malformed.excalidraw.md` — Invalid JSON for error handling

**Test cases:**

Parser tests:

- Parse valid `.excalidraw.md` with text elements and shapes
- Parse valid `.excalidraw.md` with embedded image references
- Parse valid `.excalidraw` (pure JSON)
- Handle malformed JSON → returns null
- Handle missing `%%` delimiters → returns null
- Filter deleted elements
- Default appState when missing
- Parse embedded files section correctly (hash → wikilink mapping)

Renderer tests:

- Render empty elements → valid SVG with viewBox
- Render rectangle → SVG contains path elements
- Render text → SVG contains `<text>` element
- Render with dark mode → background color changes
- Render with custom padding → viewBox changes
- Deterministic output (same seed → same paths)

PageType tests:

- Matcher returns true for data with `excalidrawData`
- Matcher returns false for regular page data
- `shouldPublish` returns false for `.excalidraw.md` files
- `shouldPublish` returns true for regular `.md` files
- Generate produces correct VirtualPage structure

#### Step 1.12: Build & Verify

1. `npm install` — install new dependencies (roughjs, perfect-freehand)
2. `npm run build` — verify clean compilation
3. `npm test` — verify all tests pass
4. `npm run typecheck` — zero type errors
5. `npm run lint` — zero lint errors
6. Test with actual Excalidraw files from `~/Repos/quartz-syncer/content/Excalidraw/`
7. Commit `dist/` directory

---

### Phase 2: Client-Side Interactive Mode (Enhancement)

> Only implement after Phase 1 is verified working end-to-end.

#### Step 2.1: Add Excalidraw Client Dependency

- Add `@excalidraw/excalidraw` as a dependency
- Use dynamic `import()` in the inline script to lazy-load it
- The ~500KB bundle loads only on pages with Excalidraw drawings
- Quartz's chunked bundling handles caching (fetched once, cached for a year)

#### Step 2.2: Interactive Inline Script

- `src/components/scripts/excalidraw-interactive.inline.ts`
- On pages with `.excalidraw-data` script element:
  - Parse JSON data from the `<script type="application/json">` element
  - Dynamically import `@excalidraw/excalidraw`
  - Mount read-only Excalidraw component, replacing the static SVG
  - Enable: pan, zoom, selection (read-only mode)
  - Handle theme switching (light/dark, `prefers-color-scheme`)
  - Handle SPA navigation: cleanup on `prenav`, reinit on `nav`
  - `window.addCleanup()` for proper teardown

#### Step 2.3: Progressive Enhancement

- Static SVG renders immediately (zero JS required)
- Loading indicator appears while Excalidraw library loads
- When JS loads, interactive component replaces static SVG
- If JS fails to load, static SVG remains fully functional
- No layout shift during hydration (container dimensions fixed)

---

## Dependency Analysis

### Phase 1 Dependencies

| Package                   | Purpose                           | Bundle?               | Native?      |
| ------------------------- | --------------------------------- | --------------------- | ------------ |
| `@quartz-community/types` | Type definitions                  | External (types only) | No           |
| `@quartz-community/utils` | Path utilities (slugify, resolve) | External (singleton)  | No           |
| `roughjs` ^4.6.6          | Synchronous SVG path generation   | Bundled               | No (pure JS) |
| `perfect-freehand` ^1.2.2 | Freedraw stroke generation        | Bundled               | No (pure JS) |
| `github-slugger` ^2.0.0   | URL slug generation               | Bundled               | No (pure JS) |

### Phase 2 Additional Dependencies

| Package                  | Purpose                        | Bundle?                  | Native? |
| ------------------------ | ------------------------------ | ------------------------ | ------- |
| `@excalidraw/excalidraw` | Client-side interactive viewer | Dynamic import (chunked) | No      |

**Zero native dependencies in Phase 1.** All bundled deps are pure JavaScript.

---

## Risk Assessment

| Risk                                                    | Likelihood | Impact | Mitigation                                                                                                                                                                     |
| ------------------------------------------------------- | ---------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| roughjs rendering differs from official Excalidraw      | Medium     | Medium | Use same seed, same roughness params. Test against known drawings. Acceptable for static preview.                                                                              |
| Text layout differs (no canvas.measureText)             | Medium     | Low    | Excalidraw stores explicit width/height on text elements. Use those values directly.                                                                                           |
| Font rendering without Virgil font                      | Low        | Medium | Embed Virgil as base64 in SVG `<defs>`. Falls back to system sans-serif.                                                                                                       |
| `.excalidraw.md` format changes in Obsidian plugin      | Low        | Medium | Version check on `source` field. Parser handles missing sections gracefully.                                                                                                   |
| Large embedded images bloat SVG                         | Medium     | Medium | Images stored in `<script type="application/json">` for Phase 2 hydration. In SVG, embed as `<image href="data:...">`. Consider lazy loading for very large files.             |
| `shouldPublish` filter doesn't prevent markdown parsing | Low        | High   | Test with actual Quartz build. Verify `.excalidraw.md` files don't appear in content pipeline. Fallback: check if `fileExtensions` declaration already excludes from markdown. |

---

## File Structure (Final)

```
src/
├── index.ts                          # Main exports
├── types.ts                          # Type definitions
├── pageType.ts                       # QuartzPageTypePlugin + filter factory
├── parser.ts                         # .excalidraw.md / .excalidraw parser
├── renderer.ts                       # Synchronous roughjs SVG renderer
├── components/
│   ├── index.ts                      # Component barrel export
│   ├── ExcalidrawBody.tsx            # Body component (SSR SVG + data)
│   ├── scripts/
│   │   └── excalidraw.inline.ts      # Client-side pan/zoom
│   └── styles/
│       └── excalidraw.scss           # Component styling
├── frames/
│   ├── index.ts                      # Frame barrel export
│   └── ExcalidrawFrame.tsx           # Full-viewport page frame
├── i18n/
│   ├── index.ts                      # i18n loader (placeholder)
│   └── locales/
│       └── en-US.ts                  # English strings (empty for now)
└── util/
    └── lang.ts                       # Utility re-exports

test/
├── helpers.ts                        # Test utilities (from template)
├── fixtures/
│   ├── simple.excalidraw             # Pure JSON fixture
│   ├── simple.excalidraw.md          # Obsidian format fixture
│   ├── with-images.excalidraw.md     # With embedded images
│   └── malformed.excalidraw.md       # Invalid JSON
├── parser.test.ts                    # Parser tests
├── renderer.test.ts                  # Renderer tests
└── pageType.test.ts                  # Plugin integration tests
```

---

## Success Criteria

### Phase 1 Complete When:

- [ ] `.excalidraw.md` files render as pages with static SVG
- [ ] `.excalidraw` files render as pages with static SVG
- [ ] `.excalidraw.md` files are NOT processed as regular markdown (filter works)
- [ ] SVG renders show correct shapes, text, colors, arrows (compared to Excalidraw app)
- [ ] Embedded images display correctly via resolved wikilinks
- [ ] Dark/light theme support works (via options)
- [ ] Basic pan/zoom interaction works on the SVG (client-side)
- [ ] Full-viewport layout with sidebar toggle works
- [ ] Plugin installs cleanly via `npx quartz plugin add`
- [ ] All tests pass, zero type errors, zero lint errors
- [ ] `dist/` committed and plugin is distributable
- [ ] Tested with real Excalidraw files from the Quartz content directory

### Phase 2 Complete When:

- [ ] Full interactive Excalidraw viewer loads on drawing pages
- [ ] Progressive enhancement: SVG first, then interactive
- [ ] Bundle only loads on pages with drawings (~500KB, chunked, cached)
- [ ] SPA navigation handles cleanup/reinit correctly
- [ ] Works with both light and dark themes
- [ ] No layout shift during hydration
