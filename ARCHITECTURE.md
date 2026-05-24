# Architecture Reference

Machine-readable architecture overview for the Quartz community plugin template.

## Plugin Lifecycle

Quartz plugins are factory functions that return an object with a `name` and lifecycle hooks.

1. **Loading**: Quartz imports the plugin from the `externalPlugins` list in `quartz.config.ts`.
2. **Initialization**: The factory function is called with user-provided options.
3. **Build Integration**:
   - **Transformers**: Run during the `transform` phase (remark/rehype).
   - **Filters**: Run after transformation to prune the content list.
   - **Emitters**: Run during the `emit` phase to generate files.
   - **Page Types**: Run to generate virtual pages or custom routes.
   - **Components**: Rendered during the HTML generation phase.

## Build System

The template uses `tsup` for bundling and declaration output.

- **Inline Scripts**: Files ending in `.inline.ts` are bundled as raw strings for client-side injection.
- **Styles**: `.scss` files are compiled to CSS strings and attached to components via `Component.css`.
- **Entry Points**:
  - `index.ts`: Main plugin exports.
  - `types.ts`: Shared type definitions.
  - `components/index.ts`: UI component exports.

## Type System

The template relies on `@quartz-community/types` for core Quartz types.

- **Branded Types**: `FullSlug` and `FilePath` are used for path safety.
- **vfile DataMap**: Augmented with `QuartzPluginData` for plugin-specific metadata.
- **Plugin Interfaces**: `QuartzTransformerPlugin`, `QuartzFilterPlugin`, `QuartzEmitterPlugin`, `QuartzPageTypePlugin`, `QuartzComponentConstructor`.

## Export Conventions

- **Default Exports**: Used for components.
- **Named Exports**: Used for plugin factories and types.
- **Re-exports**: `src/index.ts` re-exports all public APIs.

## Dependency Management

- **peerDependencies**: `preact`, `vfile`, and `@jackyzha0/quartz` (optional).
- **dependencies**: `@quartz-community/types`, `@quartz-community/utils`.
- **devDependencies**: Build tools, linters, and test runners.

## Testing Infrastructure

- **vitest**: Test runner.
- **test helpers**: Mock `BuildCtx` and `ProcessedContent` for plugin testing.

## CI/CD Pipeline

- **GitHub Actions**: Runs `npm run check` on PRs and publishes to npm on version tags (`v*`).

## Directory Structure

- `src/`: Source code.
  - `components/`: UI components.
    - `scripts/`: Client-side scripts (`.inline.ts`).
    - `styles/`: Component styles (`.scss`).
  - `i18n/`: Internationalization.
  - `util/`: Utility functions.
  - `index.ts`: Main entry point.
  - `types.ts`: Type definitions.
  - `transformer.ts`: Transformer implementation.
  - `filter.ts`: Filter implementation.
  - `emitter.ts`: Emitter implementation.
- `dist/`: Build output.
- `package.json`: Manifest and dependencies.
- `tsup.config.ts`: Build configuration.
