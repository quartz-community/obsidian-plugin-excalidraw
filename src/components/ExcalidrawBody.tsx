import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
  QuartzPluginData,
  FullSlug,
  FilePath,
} from "@quartz-community/types";
import {
  resolveRelative,
  slugifyFilePath,
  normalizeHastElement,
} from "@quartz-community/utils/path";
import { toHtml } from "hast-util-to-html";
import type { ExcalidrawData, ExcalidrawPageOptions } from "../types";
import { renderToSvg } from "../renderer";
import type { ResolvedEmbed, RenderContext, EmbedOverlay } from "../renderer";
import style from "./styles/excalidraw.scss";
// @ts-expect-error inline script import handled by bundler
import script from "./scripts/excalidraw.inline.ts";

function stripTranscludes(html: string): string {
  return html
    .replace(/<blockquote[^>]*class="[^"]*transclude[^"]*"[^>]*>[\s\S]*?<\/blockquote>/gi, "")
    .replace(/<div[^>]*class="[^"]*transclude[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "");
}

function resolveEmbeds(
  data: ExcalidrawData,
  currentSlug: FullSlug,
  allFiles: QuartzPluginData[],
): Record<string, ResolvedEmbed> {
  const result: Record<string, ResolvedEmbed> = {};
  const embeddables = data.elements.filter(
    (el) => el.type === "embeddable" || el.type === "iframe",
  );

  for (const el of embeddables) {
    const link = (el.link as string) ?? "";
    if (!link.startsWith("[[")) continue;

    const target = link.replace(/^\[\[/, "").replace(/\]\]$/, "");
    const targetLower = target.toLowerCase();

    const page = allFiles.find((f) => {
      if (!f.slug) return false;
      if (f.slug === targetLower) return true;
      const lastSegment = f.slug.split("/").pop();
      return lastSegment === targetLower;
    });

    const pageSlug = (page?.slug ?? slugifyFilePath(target as FilePath)) as FullSlug;
    const href = resolveRelative(currentSlug, pageSlug);

    if (!page || !page.htmlAst) {
      result[el.id] = {
        html: `<a href="${href}" style="color:#228be6;text-decoration:none;font-size:13px;">${target}</a>`,
        href,
      };
      continue;
    }

    const tree = page.htmlAst;
    const rebased = {
      ...tree,
      children: tree.children.map((child: unknown) => {
        if ((child as { type: string }).type === "element") {
          return normalizeHastElement(
            child as Parameters<typeof normalizeHastElement>[0],
            currentSlug,
            pageSlug,
          );
        }
        return child;
      }),
    };

    let html = toHtml(rebased as Parameters<typeof toHtml>[0], { allowDangerousHtml: true });
    html = stripTranscludes(html);
    result[el.id] = { html, href };
  }

  return result;
}

function resolveImages(data: ExcalidrawData): Record<string, string> {
  const result: Record<string, string> = {};
  if (!data.embeddedFiles) return result;

  const images = data.elements.filter((el) => el.type === "image" && el.fileId);
  for (const img of images) {
    if (data.files[img.fileId!]?.dataURL) continue;

    const wikilink = data.embeddedFiles[img.fileId!];
    if (!wikilink) continue;

    const imageName = wikilink.split("/").pop() ?? wikilink;
    result[img.fileId!] = `./${imageName}`;
  }

  return result;
}

function renderOverlay(overlay: EmbedOverlay): unknown {
  const label = overlay.link
    .replace(/^\[\[/, "")
    .replace(/\]\]$/, "")
    .replace(/^https?:\/\//, "");
  const truncatedLabel = label.length > 50 ? label.slice(0, 47) + "..." : label;

  if (overlay.isWikilink) {
    const noteContent = overlay.resolved
      ? `<a href="${overlay.resolved.href}" class="excalidraw-embed-open-link">Open note →</a><div class="excalidraw-embed-body">${overlay.resolved.html}</div>`
      : `<span class="excalidraw-embed-missing">Note not found</span>`;

    return (
      <div
        class="excalidraw-overlay excalidraw-embed-note"
        data-overlay-id={overlay.id}
        data-x={overlay.x}
        data-y={overlay.y}
        data-w={overlay.width}
        data-h={overlay.height}
      >
        <div class="excalidraw-embed-header">{"📄 " + truncatedLabel}</div>
        <div class="excalidraw-embed-content" dangerouslySetInnerHTML={{ __html: noteContent }} />
      </div>
    );
  }

  return (
    <div
      class="excalidraw-overlay excalidraw-embed-url"
      data-overlay-id={overlay.id}
      data-x={overlay.x}
      data-y={overlay.y}
      data-w={overlay.width}
      data-h={overlay.height}
    >
      <div class="excalidraw-embed-header">
        <a href={overlay.link} target="_blank" rel="noopener noreferrer">
          {"🔗 " + truncatedLabel}
        </a>
      </div>
      <iframe
        src={overlay.link}
        class="excalidraw-embed-iframe"
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
        referrerpolicy="no-referrer"
      />
    </div>
  );
}

export default ((userOpts?: ExcalidrawPageOptions) => {
  const Component: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles } = props;
    const data = fileData.excalidrawData as ExcalidrawData;
    const options = (fileData.excalidrawOptions as ExcalidrawPageOptions) ?? userOpts ?? {};
    const currentSlug = fileData.slug!;

    const resolvedEmbedMap = allFiles ? resolveEmbeds(data, currentSlug, allFiles) : undefined;
    const resolvedImageMap = resolveImages(data);
    const renderCtx: RenderContext = {
      resolvedEmbeds: resolvedEmbedMap,
      resolvedImages: resolvedImageMap,
    };
    const result = renderToSvg(data, options, renderCtx);

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
        <div class="excalidraw-container" dangerouslySetInnerHTML={{ __html: result.svg }} />
        <div
          class="excalidraw-overlays"
          data-viewbox-w={result.viewBox.width}
          data-viewbox-h={result.viewBox.height}
          data-offset-x={result.viewBox.offsetX}
          data-offset-y={result.viewBox.offsetY}
        >
          {result.overlays.map((o) => renderOverlay(o))}
        </div>
        {options.enableInteraction !== false && (
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
