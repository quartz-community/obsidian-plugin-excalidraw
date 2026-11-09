import { describe, it, expect, vi } from "vitest";
import { join } from "path";
import type {
  BuildCtx,
  FilePath,
  ProcessedContent,
  QuartzFilterPluginInstance,
} from "@quartz-community/types";
import { ExcalidrawPage } from "../src/pageType";
import { createCtx, createProcessedContent } from "./helpers";

// The body imports its browser script, which tsup bundles as text; vitest would run it.
vi.mock("../src/components/ExcalidrawBody", () => ({ default: () => null }));

const fixturesDir = join(__dirname, "fixtures");

// the plugin is also a filter (package.json quartz.category); its page type type has no shouldPublish
const filter = ExcalidrawPage() as unknown as QuartzFilterPluginInstance;
const shouldPublish = (ctx: BuildCtx, content: ProcessedContent) =>
  filter.shouldPublish(ctx, content);

describe("ExcalidrawPage.generate", () => {
  const plugin = ExcalidrawPage();

  it("gives virtual pages the drawing file's source paths", async () => {
    const ctx = createCtx({
      argv: { directory: fixturesDir },
      allFiles: ["simple.excalidraw.md", "simple.excalidraw", "note.md"] as FilePath[],
    });

    // Quartz parses the Markdown drawing as a note, which this plugin's filter takes over
    shouldPublish(
      ctx,
      createProcessedContent({ relativePath: "simple.excalidraw.md" as FilePath }),
    );
    const pages = await plugin.generate!({ content: [], cfg: ctx.cfg.configuration, ctx });

    expect(pages.map((p) => [p.slug, p.title, p.data.filePath, p.data.relativePath])).toEqual([
      [
        "simple.excalidraw",
        "simple",
        `${fixturesDir}/simple.excalidraw.md`,
        "simple.excalidraw.md",
      ],
      ["simple.excalidraw", "simple", `${fixturesDir}/simple.excalidraw`, "simple.excalidraw"],
    ]);
  });

  it("skips files that are not drawings", async () => {
    const ctx = createCtx({
      argv: { directory: fixturesDir },
      allFiles: ["malformed.excalidraw.md", "missing.excalidraw"] as FilePath[],
    });

    const pages = await plugin.generate!({ content: [], cfg: ctx.cfg.configuration, ctx });

    expect(pages).toEqual([]);
  });
});

describe("ExcalidrawPage publishing (quartz-community/bases-page#11)", () => {
  const plugin = ExcalidrawPage();
  const note = (relativePath: string, frontmatter: Record<string, unknown> = {}) =>
    createProcessedContent({
      relativePath: relativePath as FilePath,
      frontmatter: { title: relativePath, ...frontmatter },
    });

  it("the filter takes drawing notes out of the content, and keeps its own pages", () => {
    const ctx = createCtx({ buildId: "filter" });
    expect(shouldPublish(ctx, note("simple.excalidraw.md"))).toBe(false);
    expect(shouldPublish(ctx, note("note.md"))).toBe(true);
    const page = createProcessedContent({
      relativePath: "simple.excalidraw.md" as FilePath,
      excalidrawData: {},
    } as Record<string, unknown>);
    expect(shouldPublish(ctx, page)).toBe(true);
  });

  it("a Markdown drawing's page has the note's frontmatter, for the site's filters and encryption", async () => {
    const ctx = createCtx({
      buildId: "frontmatter",
      argv: { directory: fixturesDir },
      allFiles: ["simple.excalidraw.md", "simple.excalidraw"] as FilePath[],
    });
    shouldPublish(ctx, note("simple.excalidraw.md", { publish: true, password: "pw" }));
    const pages = await plugin.generate!({ content: [], cfg: ctx.cfg.configuration, ctx });

    expect(pages.map((p) => [p.data.relativePath, p.data.frontmatter])).toEqual([
      [
        "simple.excalidraw.md",
        { title: "simple", tags: ["excalidraw"], publish: true, password: "pw" },
      ],
      // a JSON drawing has no frontmatter
      ["simple.excalidraw", { title: "simple", tags: ["excalidraw"] }],
    ]);
  });

  it("a Markdown drawing an earlier filter rejected gets no page", async () => {
    const ctx = createCtx({
      buildId: "rejected",
      argv: { directory: fixturesDir },
      allFiles: ["simple.excalidraw.md"] as FilePath[],
    });
    const pages = await plugin.generate!({ content: [], cfg: ctx.cfg.configuration, ctx });
    expect(pages).toEqual([]);
  });

  it("forgets the drawing notes of earlier builds", async () => {
    const directory = { argv: { directory: fixturesDir } };
    const allFiles = ["simple.excalidraw.md"] as FilePath[];
    shouldPublish(createCtx({ buildId: "first", ...directory }), note("simple.excalidraw.md"));
    const ctx = createCtx({ buildId: "second", ...directory, allFiles });
    expect(await plugin.generate!({ content: [], cfg: ctx.cfg.configuration, ctx })).toEqual([]);
  });
});
