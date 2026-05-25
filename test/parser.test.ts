import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { parseExcalidraw, parseExcalidrawJson, parseExcalidrawMd } from "../src/parser";

const fixturesDir = join(__dirname, "fixtures");

function readFixture(name: string): string {
  return readFileSync(join(fixturesDir, name), "utf-8");
}

describe("parseExcalidrawJson", () => {
  it("parses valid .excalidraw JSON", () => {
    const content = readFixture("simple.excalidraw");
    const result = parseExcalidrawJson(content);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("excalidraw");
    expect(result!.version).toBe(2);
    expect(result!.elements.length).toBe(2);
    expect(result!.appState.viewBackgroundColor).toBe("#ffffff");
  });

  it("filters deleted elements", () => {
    const content = readFixture("simple.excalidraw");
    const result = parseExcalidrawJson(content);

    const ids = result!.elements.map((el) => el.id);
    expect(ids).toContain("rect1");
    expect(ids).toContain("text1");
    expect(ids).not.toContain("deleted1");
  });

  it("returns null for non-excalidraw JSON", () => {
    const result = parseExcalidrawJson('{"type": "other", "data": []}');
    expect(result).toBeNull();
  });

  it("returns null for invalid JSON", () => {
    const result = parseExcalidrawJson("not json at all");
    expect(result).toBeNull();
  });

  it("defaults appState when missing", () => {
    const content = JSON.stringify({ type: "excalidraw", version: 2, elements: [] });
    const result = parseExcalidrawJson(content);

    expect(result).not.toBeNull();
    expect(result!.appState.viewBackgroundColor).toBe("#ffffff");
    expect(result!.appState.exportBackground).toBe(true);
  });
});

describe("parseExcalidrawMd", () => {
  it("parses valid .excalidraw.md file", () => {
    const content = readFixture("simple.excalidraw.md");
    const result = parseExcalidrawMd(content);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("excalidraw");
    expect(result!.elements.length).toBe(2);
  });

  it("extracts elements correctly from code fence", () => {
    const content = readFixture("simple.excalidraw.md");
    const result = parseExcalidrawMd(content);

    const rect = result!.elements.find((el) => el.id === "rect1");
    expect(rect).toBeDefined();
    expect(rect!.type).toBe("rectangle");
    expect(rect!.width).toBe(200);
  });

  it("parses embedded files section", () => {
    const content = readFixture("with-images.excalidraw.md");
    const result = parseExcalidrawMd(content);

    expect(result).not.toBeNull();
    expect(result!.embeddedFiles).toBeDefined();
    expect(result!.embeddedFiles!["f5de7e7b9672dcaec815dbbc90d72635f638da20"]).toBe(
      "test-image.png",
    );
  });

  it("includes image data from files field", () => {
    const content = readFixture("with-images.excalidraw.md");
    const result = parseExcalidrawMd(content);

    const fileData = result!.files["f5de7e7b9672dcaec815dbbc90d72635f638da20"];
    expect(fileData).toBeDefined();
    expect(fileData!.dataURL).toContain("data:image/png;base64,");
  });

  it("returns null for malformed JSON", () => {
    const content = readFixture("malformed.excalidraw.md");
    const result = parseExcalidrawMd(content);
    expect(result).toBeNull();
  });

  it("returns null for content without %% delimiters", () => {
    const result = parseExcalidrawMd("# Just a heading\nno drawing here");
    expect(result).toBeNull();
  });
});

describe("parseExcalidraw", () => {
  it("routes .excalidraw files to JSON parser", () => {
    const content = readFixture("simple.excalidraw");
    const result = parseExcalidraw(content, "drawing.excalidraw");

    expect(result).not.toBeNull();
    expect(result!.type).toBe("excalidraw");
  });

  it("routes .excalidraw.md files to MD parser", () => {
    const content = readFixture("simple.excalidraw.md");
    const result = parseExcalidraw(content, "drawing.excalidraw.md");

    expect(result).not.toBeNull();
    expect(result!.type).toBe("excalidraw");
  });

  it("returns null for unsupported extensions", () => {
    const result = parseExcalidraw("{}", "file.txt");
    expect(result).toBeNull();
  });
});
