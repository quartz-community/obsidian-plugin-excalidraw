import { QuartzPageTypePlugin } from '@quartz-community/types';
import { ExcalidrawPageOptions } from './types.js';
export { ExcalidrawData, ExcalidrawElement } from './types.js';
export { ExcalidrawBody } from './components/index.js';
export { ExcalidrawFrame } from './frames/index.js';

declare const ExcalidrawPage: QuartzPageTypePlugin<ExcalidrawPageOptions>;

export { ExcalidrawPage, ExcalidrawPageOptions };
