import {UserConfigExport} from 'vitest/dist/config';
import {UserConfigFn} from 'vitest/config';
import {PromiseOr, RecursivePartial} from '@myparcel/ts-utils';

declare function createViteConfig(config?: PromiseOr<RecursivePartial<UserConfigExport>>): UserConfigFn;
