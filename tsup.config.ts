import { defineConfig } from "tsup";
import type { Plugin } from "esbuild";
import path from "path";
import { validateManifest } from "./src/build/validate-manifest";

validateManifest();

const inlineScriptPlugin: Plugin = {
  name: "inline-script-loader",
  setup(parentBuild) {
    const absWorkingDir = parentBuild.initialOptions.absWorkingDir ?? process.cwd();

    parentBuild.onLoad({ filter: /\.scss$/ }, async (args) => {
      const sass = await import("sass");
      const result = sass.compile(args.path);
      return { contents: result.css, loader: "text" };
    });

    parentBuild.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const esbuild = await import("esbuild");
      const fs = await import("fs");
      let text = await fs.promises.readFile(args.path, "utf8");

      text = text.replace(/^export default /gm, "");
      text = text.replace(/^export /gm, "");

      const resolveDir = path.dirname(args.path);
      const sourcefile = path.relative(absWorkingDir, args.path);

      const result = await esbuild.build({
        stdin: {
          contents: text,
          loader: "ts",
          resolveDir,
          sourcefile,
        },
        write: false,
        bundle: true,
        minify: true,
        platform: "browser",
        format: "esm",
        target: "es2020",
        sourcemap: false,
        external: ["http://*", "https://*"],
      });

      const js = result.outputFiles?.[0]?.text;
      if (!js) throw new Error(`inline-script-loader: no JS output for ${args.path}`);

      return {
        contents: js,
        loader: "text",
      };
    });
  },
};

const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
];

export default defineConfig({
  entry: {
    index: "src/index.ts",
    types: "src/types.ts",
    "components/index": "src/components/index.ts",
    "frames/index": "src/frames/index.ts",
  },
  format: ["esm"],
  dts: true,
  tsconfig: "tsconfig.build.json",
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  splitting: false,
  outDir: "dist",
  platform: "node",
  noExternal: [/.*/],
  external: SINGLETON_EXTERNALS,
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
  esbuildOptions(options) {
    options.jsx = "automatic";
    options.jsxImportSource = "preact";
  },
  esbuildPlugins: [inlineScriptPlugin],
});
