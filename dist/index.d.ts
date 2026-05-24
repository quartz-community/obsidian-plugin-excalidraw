import { QuartzTransformerPlugin, QuartzFilterPlugin, QuartzEmitterPlugin } from '@quartz-community/types';
export { PageGenerator, PageMatcher, QuartzComponent, QuartzComponentConstructor, QuartzComponentProps, QuartzEmitterPlugin, QuartzFilterPlugin, QuartzPageTypePlugin, QuartzPageTypePluginInstance, QuartzTransformerPlugin, StringResource, VirtualPage } from '@quartz-community/types';
import { ExampleTransformerOptions, ExampleFilterOptions, ExampleEmitterOptions } from './types.js';
export { ExampleComponent, ExampleComponentOptions } from './components/index.js';

/**
 * Example transformer showing remark/rehype usage and resource injection.
 */
declare const ExampleTransformer: QuartzTransformerPlugin<Partial<ExampleTransformerOptions>>;

/**
 * Example filter that removes drafts, tagged pages, and excluded path prefixes.
 */
declare const ExampleFilter: QuartzFilterPlugin<Partial<ExampleFilterOptions>>;

/**
 * Example emitter that writes a JSON manifest of content metadata.
 */
declare const ExampleEmitter: QuartzEmitterPlugin<Partial<ExampleEmitterOptions>>;

export { ExampleEmitter, ExampleEmitterOptions, ExampleFilter, ExampleFilterOptions, ExampleTransformer, ExampleTransformerOptions };
