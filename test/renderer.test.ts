import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { renderToSvg } from "../src/renderer";
import { parseExcalidrawJson, parseExcalidrawMd } from "../src/parser";

const fixturesDir = join(__dirname, "fixtures");

function readFixture(name: string): string {
  return readFileSync(join(fixturesDir, name), "utf-8");
}

describe("renderToSvg", () => {
  it("renders empty elements to valid SVG", () => {
    const svg = renderToSvg(
      { type: "excalidraw", version: 2, elements: [], appState: {}, files: {} },
      {},
    );

    expect(svg).toContain("<svg");
    expect(svg).toContain("xmlns=");
    expect(svg).toContain("</svg>");
  });

  it("renders rectangle elements as SVG paths", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("<svg");
    expect(svg).toContain("<path");
    expect(svg).toContain("</svg>");
  });

  it("renders text elements", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("<text");
    expect(svg).toContain("Hello World");
  });

  it("includes font definitions", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("font-face");
    expect(svg).toContain("Virgil");
  });

  it("applies background color", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("--excalidraw-bg");
  });

  it("respects dark mode option", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg = renderToSvg(data!, { darkMode: "dark" });

    expect(svg).toContain('data-bg-color="#1e1e1e"');
  });

  it("respects export padding", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svgDefault = renderToSvg(data!, {});
    const svgPadded = renderToSvg(data!, { exportPadding: 50 });

    expect(svgDefault).not.toBe(svgPadded);
  });

  it("renders images with data URLs", () => {
    const data = parseExcalidrawMd(readFixture("with-images.excalidraw.md"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("<image");
    expect(svg).toContain("data:image/png;base64,");
  });

  it("produces deterministic output for same seed", () => {
    const data = parseExcalidrawJson(readFixture("simple.excalidraw"));
    const svg1 = renderToSvg(data!, {});
    const svg2 = renderToSvg(data!, {});

    expect(svg1).toBe(svg2);
  });

  it("renders .excalidraw.md file content", () => {
    const data = parseExcalidrawMd(readFixture("simple.excalidraw.md"));
    const svg = renderToSvg(data!, {});

    expect(svg).toContain("<svg");
    expect(svg).toContain("<path");
    expect(svg).toContain("Hello World");
  });
});
