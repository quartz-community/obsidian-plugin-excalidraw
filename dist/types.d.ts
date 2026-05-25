export { BuildCtx, CSSResource, ChangeEvent, FilePath, FullSlug, JSResource, PageGenerator, PageMatcher, ProcessedContent, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzEmitterPluginInstance, QuartzFilterPlugin, QuartzFilterPluginInstance, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzPluginData, QuartzTransformerPlugin, QuartzTransformerPluginInstance, StaticResources, VirtualPage } from '@quartz-community/types';

interface ExcalidrawPageOptions {
    /** Enable client-side pan/zoom interaction on the SVG. */
    enableInteraction?: boolean;
    /** Theme for rendering: "auto" follows system preference. */
    darkMode?: "auto" | "light" | "dark";
    /** Padding around drawing content in the SVG (px). */
    exportPadding?: number;
}
interface ExcalidrawData {
    type: "excalidraw";
    version: number;
    source?: string;
    elements: ExcalidrawElement[];
    appState: Partial<ExcalidrawAppState>;
    files: Record<string, ExcalidrawFileData>;
    /** Parsed from # Embedded files section — maps file hash → wikilink target */
    embeddedFiles?: Record<string, string>;
}
interface ExcalidrawElement {
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
    roundness: {
        type: number;
        value?: number;
    } | null;
    points?: Array<[number, number]>;
    text?: string;
    rawText?: string;
    fontSize?: number;
    fontFamily?: number;
    textAlign?: string;
    verticalAlign?: string;
    fileId?: string;
    startBinding?: unknown;
    endBinding?: unknown;
    startArrowhead?: string | null;
    endArrowhead?: string | null;
    groupIds?: string[];
    frameId?: string | null;
    boundElements?: Array<{
        id: string;
        type: string;
    }> | null;
    link?: string | null;
    [key: string]: unknown;
}
interface ExcalidrawAppState {
    viewBackgroundColor: string;
    exportBackground: boolean;
    exportWithDarkMode: boolean;
    gridSize?: number | null;
    [key: string]: unknown;
}
interface ExcalidrawFileData {
    mimeType: string;
    id: string;
    dataURL: string;
    created: number;
    lastRetrieved?: number;
}

export type { ExcalidrawAppState, ExcalidrawData, ExcalidrawElement, ExcalidrawFileData, ExcalidrawPageOptions };
