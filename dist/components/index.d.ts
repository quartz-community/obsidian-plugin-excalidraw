import { QuartzComponent } from '@quartz-community/types';

interface ExampleComponentOptions {
    prefix?: string;
    suffix?: string;
    className?: string;
}
declare const _default: (opts?: ExampleComponentOptions) => QuartzComponent;

export { _default as ExampleComponent, type ExampleComponentOptions };
