import {type ConfigEnv, type UserConfigExport} from 'vitest/dist/config';
import {type UserConfigFn} from 'vitest/config';
import {type Api} from '@vitejs/plugin-vue';
import {type PromiseOr, type RecursivePartial} from '@myparcel/ts-utils';

declare function createViteConfig(
  config?: PromiseOr<RecursivePartial<UserConfigExport> | ((env: ConfigEnv) => RecursivePartial<UserConfigExport>)>,
): UserConfigFn;

declare function createVueViteConfig(
  config?: PromiseOr<RecursivePartial<UserConfigExport> | ((env: ConfigEnv) => RecursivePartial<UserConfigExport>)>,
): UserConfigFn;

declare function createVuePlugin(env: ConfigEnv): Plugin<Api>;
