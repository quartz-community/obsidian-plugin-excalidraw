import type {
  BuildCtx,
  FilePath,
  FullSlug,
  QuartzConfig,
  ProcessedContent,
  QuartzPluginData,
} from "@quartz-community/types";
import { isFilePath, isFullSlug } from "@quartz-community/utils";
import { VFile } from "vfile";

type BuildCtxOverrides = Omit<Partial<BuildCtx>, "argv"> & {
  argv?: Partial<BuildCtx["argv"]>;
};

export const createCtx = (overrides: BuildCtxOverrides = {}): BuildCtx => {
  const { argv: argvOverrides, ...rest } = overrides;
  const argv: BuildCtx["argv"] = {
    directory: "content",
    verbose: false,
    output: "dist",
    serve: false,
    watch: false,
    port: 0,
    wsPort: 0,
    ...argvOverrides,
  };

  return {
    buildId: "test-build",
    argv,
    cfg: {} as QuartzConfig,
    allSlugs: [],
    allFiles: [],
    incremental: false,
    ...rest,
  };
};

export const createProcessedContent = (data: Partial<QuartzPluginData> = {}): ProcessedContent => {
  const vfile = new VFile("");
  vfile.data = data;
  return [{ type: "root", children: [] }, vfile];
};

export const assertFilePath = (value: string): FilePath => {
  if (!isFilePath(value)) {
    throw new Error(`Invalid FilePath: ${value}`);
  }
  return value;
};

export const assertFullSlug = (value: string): FullSlug => {
  if (!isFullSlug(value)) {
    throw new Error(`Invalid FullSlug: ${value}`);
  }
  return value;
};
