import LZString from "lz-string";
import type { ExcalidrawData } from "./types";

const DEFAULT_APP_STATE = {
  viewBackgroundColor: "#ffffff",
  exportBackground: true,
  exportWithDarkMode: false,
};

export function parseExcalidraw(content: string, filePath: string): ExcalidrawData | null {
  if (filePath.endsWith(".excalidraw.md")) {
    return parseExcalidrawMd(content);
  }
  if (filePath.endsWith(".excalidraw")) {
    return parseExcalidrawJson(content);
  }
  return null;
}

export function parseExcalidrawJson(content: string): ExcalidrawData | null {
  try {
    const data = JSON.parse(content);
    if (data.type !== "excalidraw") return null;
    return normalizeData(data);
  } catch {
    return null;
  }
}

export function parseExcalidrawMd(content: string): ExcalidrawData | null {
  const json = extractJsonFromMd(content);
  if (!json) return null;

  let data: ExcalidrawData;
  try {
    data = JSON.parse(json);
  } catch {
    return null;
  }

  if (data.type !== "excalidraw") return null;

  const embeddedFiles = parseEmbeddedFilesSection(content);
  const normalized = normalizeData(data);
  if (!normalized) return null;

  if (Object.keys(embeddedFiles).length > 0) {
    normalized.embeddedFiles = embeddedFiles;
  }

  return normalized;
}

function extractJsonFromMd(content: string): string | null {
  // Find the drawing section between %% delimiters
  const drawingMarkerIdx = content.indexOf("# Drawing");
  if (drawingMarkerIdx === -1) {
    // Fallback: try to find %% delimiters directly
    return extractBetweenPercentDelimiters(content);
  }

  const afterMarker = content.slice(drawingMarkerIdx);
  return extractBetweenPercentDelimiters(afterMarker) ?? extractFromCodeFence(afterMarker);
}

function extractBetweenPercentDelimiters(content: string): string | null {
  const firstPct = content.indexOf("%%");
  if (firstPct === -1) return null;

  const afterFirst = content.indexOf("%%", firstPct);
  const contentAfterFirstPct = content.slice(afterFirst + 2);
  const secondPct = contentAfterFirstPct.indexOf("%%");
  if (secondPct === -1) return null;

  const block = contentAfterFirstPct.slice(0, secondPct).trim();
  return extractFromCodeFence(block) ?? extractRawJson(block);
}

function extractFromCodeFence(block: string): string | null {
  const compressedFenceStart = block.indexOf("```compressed-json");
  if (compressedFenceStart !== -1) {
    const afterFence = block.slice(compressedFenceStart + "```compressed-json".length);
    const fenceEnd = afterFence.indexOf("```");
    if (fenceEnd === -1) return null;
    const compressedContent = afterFence.slice(afterFence.indexOf("\n") + 1, fenceEnd);
    const cleaned = compressedContent.replace(/[\n\r]/g, "");
    const decompressed = LZString.decompressFromBase64(cleaned);
    return decompressed ?? null;
  }

  const fenceStart = block.indexOf("```json");
  if (fenceStart === -1) {
    const altFenceStart = block.indexOf("```");
    if (altFenceStart === -1) return null;
    const afterFence = block.slice(altFenceStart + 3);
    const fenceEnd = afterFence.indexOf("```");
    if (fenceEnd === -1) return null;
    return afterFence.slice(afterFence.indexOf("\n") + 1, fenceEnd).trim();
  }

  const afterFence = block.slice(fenceStart + 7);
  const fenceEnd = afterFence.indexOf("```");
  if (fenceEnd === -1) return null;
  return afterFence.slice(afterFence.indexOf("\n") + 1, fenceEnd).trim();
}

function extractRawJson(block: string): string | null {
  // Try to find raw JSON object after "# Drawing" heading
  const lines = block.split("\n");
  const jsonStart = lines.findIndex((line) => line.trimStart().startsWith("{"));
  if (jsonStart === -1) return null;

  // Collect everything from the opening brace to the end
  const jsonContent = lines.slice(jsonStart).join("\n").trim();
  // Validate it looks like JSON
  if (jsonContent.startsWith("{") && jsonContent.endsWith("}")) {
    return jsonContent;
  }
  return null;
}

function parseEmbeddedFilesSection(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const sectionMatch = content.match(/^##?\s+Embedded\s+[Ff]iles\s*$/im);
  if (!sectionMatch) return result;
  const sectionIdx = sectionMatch.index!;

  const afterSection = content.slice(sectionIdx + sectionMatch[0].length);
  const endIdx = afterSection.indexOf("%%");
  const section = endIdx === -1 ? afterSection : afterSection.slice(0, endIdx);

  const pattern = /^([a-f0-9]+):\s+\[\[(.+?)\]\]\s*$/gm;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(section)) !== null) {
    result[match[1]!] = match[2]!;
  }

  return result;
}

function normalizeData(data: unknown): ExcalidrawData | null {
  const d = data as Record<string, unknown>;
  if (typeof d !== "object" || d === null) return null;

  const elements = Array.isArray(d.elements)
    ? (d.elements as ExcalidrawData["elements"]).filter((el) => !el.isDeleted)
    : [];

  const appState =
    typeof d.appState === "object" && d.appState !== null
      ? (d.appState as ExcalidrawData["appState"])
      : {};

  const files =
    typeof d.files === "object" && d.files !== null ? (d.files as ExcalidrawData["files"]) : {};

  return {
    type: "excalidraw",
    version: typeof d.version === "number" ? d.version : 2,
    source: typeof d.source === "string" ? d.source : undefined,
    elements,
    appState: { ...DEFAULT_APP_STATE, ...appState },
    files,
  };
}
