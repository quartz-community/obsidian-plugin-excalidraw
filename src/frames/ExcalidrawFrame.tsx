import type { PageFrame, PageFrameProps } from "@quartz-community/types";
import type { ComponentChildren } from "preact";

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
  grid-template-areas:
    "grid-center";
  height: 100vh;
  padding: 0;
}

.page[data-frame="excalidraw"] > #quartz-body > .center.excalidraw-frame {
  max-width: 100%;
  min-width: 100%;
  height: 100%;
  margin: 0;
}

.page[data-frame="excalidraw"] > #quartz-body.lock-scroll > * {
  transform: none;
}
`,
  render({ componentData, pageBody: Content, left }: PageFrameProps): unknown {
    const renderSlot = (Component: (props: typeof componentData) => unknown): ComponentChildren =>
      Component(componentData) as ComponentChildren;
    return (
      <div class="center excalidraw-frame">
        <button class="excalidraw-sidebar-toggle" type="button" aria-label="Toggle sidebar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="excalidraw-sidebar-icon-open"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="excalidraw-sidebar-icon-close"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <aside class="excalidraw-sidebar">
          {left.map((BodyComponent) => renderSlot(BodyComponent))}
        </aside>
        <div class="excalidraw-stage">{renderSlot(Content)}</div>
      </div>
    );
  },
};
