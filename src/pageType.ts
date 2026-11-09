import type {
  FilePath,
  QuartzPageTypePlugin,
  PageMatcher,
  FullSlug,
  VirtualPage,
  ProcessedContent,
  BuildCtx,
} from "@quartz-community/types";
import { joinSegments, slugifyFilePath } from "@quartz-community/utils/path";
import { readFileSync } from "fs";
import { join } from "path";
import { parseExcalidraw } from "./parser";
import ExcalidrawBody from "./components/ExcalidrawBody";
import type { ExcalidrawPageOptions } from "./types";

const excalidrawMatcher: PageMatcher = ({ fileData }) => {
  return "excalidrawData" in fileData;
};

const isDrawing = (path: string) => path.endsWith(".excalidraw.md") || path.endsWith(".excalidraw");

// A drawing stored as Markdown is parsed as a note first, so it has frontmatter (`publish`,
// `draft`, `password`, …). This plugin's filter takes the note out of the content (the drawing
// gets its own page instead) and keeps its frontmatter for that page, so the site's filters and
// encryption see it as they see notes. A drawing note an earlier filter rejected never reaches
// this filter, and gets no page. Module state: Quartz instantiates the plugin once per category
// (filter, page type). Kept per build (ctx.buildId), as the filters run again on every rebuild.
let drawingNotesBuild: string | undefined;
const drawingNotes = new Map<string, Record<string, unknown>>();
function drawingNotesOf(ctx: BuildCtx): Map<string, Record<string, unknown>> {
  if (drawingNotesBuild !== ctx.buildId) {
    drawingNotesBuild = ctx.buildId;
    drawingNotes.clear();
  }
  return drawingNotes;
}

export const ExcalidrawPage: QuartzPageTypePlugin<ExcalidrawPageOptions> = (opts) => ({
  name: "ExcalidrawPage",
  priority: 25,
  fileExtensions: [".excalidraw.md", ".excalidraw"],
  match: excalidrawMatcher,

  generate({ ctx }) {
    const excalidrawFiles = ctx.allFiles.filter(isDrawing);

    const imageFiles = ctx.allFiles.filter((fp: string) =>
      /\.(png|jpe?g|gif|svg|webp|avif|bmp|ico)$/i.test(fp),
    );

    const virtualPages: VirtualPage[] = [];
    const notes = drawingNotesOf(ctx);

    for (const filePath of excalidrawFiles) {
      const fullPath = join(ctx.argv.directory, filePath);
      let content: string;
      try {
        content = readFileSync(fullPath, "utf-8");
      } catch {
        continue;
      }

      const isNote = filePath.endsWith(".md");
      const noteFrontmatter = isNote ? notes.get(filePath) : undefined;
      if (isNote && !noteFrontmatter) continue;

      const data = parseExcalidraw(content, filePath);
      if (!data) continue;

      const resolvedImagePaths: Record<string, string> = {};
      if (data.embeddedFiles) {
        for (const [hash, wikilink] of Object.entries(data.embeddedFiles)) {
          if (data.files[hash]?.dataURL) continue;
          const targetName = wikilink.split("/").pop()?.toLowerCase() ?? "";
          const match = imageFiles.find((fp: string) => {
            const fpName = fp.split("/").pop()?.toLowerCase() ?? "";
            return fpName === targetName;
          });
          if (match) {
            resolvedImagePaths[hash] = match;
          }
        }
      }

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
          // The page stands for the drawing file: give it the source paths Quartz's parser
          // sets on notes (instead of the synthetic `<slug>.md`), so bases list it as that
          // file (file.ext "excalidraw", or "md" for a drawing stored as Markdown), and
          // folder listings and the content index see its real path.
          filePath: joinSegments(ctx.argv.directory, filePath) as FilePath,
          relativePath: filePath as FilePath,
          frontmatter: { ...noteFrontmatter, title: baseName, tags: ["excalidraw"] },
          excalidrawData: data,
          excalidrawOptions: opts,
          excalidrawImagePaths: resolvedImagePaths,
        },
      });
    }

    return virtualPages;
  },

  shouldPublish(ctx: BuildCtx, content: ProcessedContent) {
    const data = content[1].data;
    // this plugin's own pages (Quartz 5.1+ runs the filters on pages that stand for files)
    if ("excalidrawData" in data) return true;
    const relativePath = data.relativePath ?? "";
    if (!isDrawing(relativePath)) return true;
    drawingNotesOf(ctx).set(relativePath, { ...(data.frontmatter ?? {}) });
    return false;
  },

  layout: "excalidraw",
  frame: "excalidraw",
  body: ExcalidrawBody,
});
