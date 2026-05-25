import type {
  QuartzPageTypePlugin,
  PageMatcher,
  FullSlug,
  VirtualPage,
  ProcessedContent,
  BuildCtx,
} from "@quartz-community/types";
import { slugifyFilePath } from "@quartz-community/utils/path";
import { readFileSync } from "fs";
import { join } from "path";
import { parseExcalidraw } from "./parser";
import ExcalidrawBody from "./components/ExcalidrawBody";
import type { ExcalidrawPageOptions } from "./types";

const excalidrawMatcher: PageMatcher = ({ fileData }) => {
  return "excalidrawData" in fileData;
};

export const ExcalidrawPage: QuartzPageTypePlugin<ExcalidrawPageOptions> = (opts) => ({
  name: "ExcalidrawPage",
  priority: 25,
  fileExtensions: [".excalidraw.md", ".excalidraw"],
  match: excalidrawMatcher,

  generate({ ctx }) {
    const excalidrawFiles = ctx.allFiles.filter(
      (fp: string) => fp.endsWith(".excalidraw.md") || fp.endsWith(".excalidraw"),
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

      const baseName =
        filePath
          .replace(/\.excalidraw\.md$/, "")
          .replace(/\.excalidraw$/, "")
          .split("/")
          .pop() ?? "Excalidraw Drawing";
      const slug = slugifyFilePath(filePath as Parameters<typeof slugifyFilePath>[0]) as FullSlug;

      virtualPages.push({
        slug,
        title: baseName,
        data: {
          frontmatter: { title: baseName, tags: ["excalidraw"] },
          excalidrawData: data,
          excalidrawOptions: opts,
        },
      });
    }

    return virtualPages;
  },

  shouldPublish(_ctx: BuildCtx, content: ProcessedContent) {
    const relativePath = content[1].data.relativePath ?? "";
    if (relativePath.endsWith(".excalidraw.md") || relativePath.endsWith(".excalidraw")) {
      return false;
    }
    return true;
  },

  layout: "excalidraw",
  frame: "excalidraw",
  body: ExcalidrawBody,
});
