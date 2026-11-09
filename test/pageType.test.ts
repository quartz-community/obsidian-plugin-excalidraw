import { describe, it, expect, vi } from "vitest";
import { join } from "path";
import type { FilePath } from "@quartz-community/types";
import { ExcalidrawPage } from "../src/pageType";
import { createCtx } from "./helpers";

// The body imports its browser script, which tsup bundles as text; vitest would run it.
vi.mock("../src/components/ExcalidrawBody", () => ({ default: () => null }));

const fixturesDir = join(__dirname, "fixtures");

describe("ExcalidrawPage.generate", () => {
  const plugin = ExcalidrawPage();

  it("gives virtual pages the drawing file's source paths", async () => {
    const ctx = createCtx({
      argv: { directory: fixturesDir },
      allFiles: ["simple.excalidraw.md", "simple.excalidraw", "note.md"] as FilePath[],
    });

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
