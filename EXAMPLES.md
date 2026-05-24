# Plugin Examples

Minimal, annotated examples for each Quartz plugin type.

## 1. Minimal Transformer

Wraps an existing remark plugin to enforce hard line breaks.

```ts
import remarkBreaks from "remark-breaks";
import type { QuartzTransformerPlugin } from "@quartz-community/types";

export const HardLineBreaks: QuartzTransformerPlugin<void> = () => ({
  name: "HardLineBreaks",
  markdownPlugins() {
    // Return a list of unified/remark plugins
    return [remarkBreaks];
  },
});
```

## 2. Minimal Filter

Excludes pages marked as `draft: true` in frontmatter.

```ts
import type { QuartzFilterPlugin } from "@quartz-community/types";

export const RemoveDrafts: QuartzFilterPlugin<void> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    // Access frontmatter from vfile data
    const draft = vfile.data?.frontmatter?.draft;
    // Return false to exclude the page from the build
    return draft !== true;
  },
});
```

## 3. Minimal Emitter

Writes a `CNAME` file to the output directory.

```ts
import fs from "node:fs/promises";
import path from "node:path";
import type { QuartzEmitterPlugin } from "@quartz-community/types";

export const CNAME: QuartzEmitterPlugin<{ domain: string }> = (opts) => ({
  name: "CNAME",
  async emit(ctx, _content, _resources) {
    // ctx.argv.output is the destination directory
    const filePath = path.join(ctx.argv.output, "CNAME");
    await fs.writeFile(filePath, opts.domain);
    // Return the list of emitted file paths
    return [filePath as any];
  },
});
```

## 4. Minimal Component

Renders a simple spacer div with custom CSS.

```tsx
import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types";

export default ((opts?: { height?: string }) => {
  const Component: QuartzComponent = () => {
    return <div class="spacer" style={{ height: opts?.height ?? "1rem" }} />;
  };

  // Attach CSS string to the component
  Component.css = ".spacer { width: 100%; }";
  return Component;
}) satisfies QuartzComponentConstructor;
```

## 5. Minimal Page Type

Generates a virtual "About" page if it doesn't exist.

```ts
import type { QuartzPageTypePlugin } from "@quartz-community/types";

export const AboutPage: QuartzPageTypePlugin<void> = () => ({
  name: "AboutPage",
  // Match the slug to handle
  match: (slug) => slug === "about",
  // Generate the page content
  generate: async (_ctx, _content) => ({
    slug: "about" as any,
    frontmatter: { title: "About" },
    content: "This is a virtual about page.",
  }),
});
```

## 6. Minimal Bases View Registration

Registers a custom view for the `@quartz-community/bases-page` system.

```ts
import { viewRegistry } from "@quartz-community/bases-page";

export function init() {
  // Register a view that can be used in bases-page layouts
  viewRegistry.register("my-custom-view", (props) => {
    return <div>Custom View for {props.fileData.slug}</div>;
  });
}
```

## 7. Minimal i18n Setup

Per-plugin translations with a fallback mechanism.

```ts
// src/i18n/locales/en-US.ts
export default {
  hello: "Hello",
};

// src/i18n/index.ts
import enUS from "./locales/en-US";
const locales = { "en-US": enUS };

export function i18n(locale: string) {
  // Fallback to en-US if locale is not found
  return locales[locale as keyof typeof locales] || enUS;
}
```
