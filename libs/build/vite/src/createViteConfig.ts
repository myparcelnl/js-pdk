import {PromiseOr, RecursivePartial} from '@myparcel/ts-utils';
import {UserConfigExport} from 'vitest/dist/config';
import {UserConfigFn} from 'vitest/config';
import {commonViteConfig} from './commonViteConfig';
import {mergeConfig} from 'vite';

type CreateViteConfig = (config?: PromiseOr<RecursivePartial<UserConfigExport>>) => UserConfigFn;

export const createViteConfig: CreateViteConfig = (config) => async (env) => {
  let resolvedConfig: RecursivePartial<UserConfigExport> = config ?? {};

  if (typeof config === 'function') {
    resolvedConfig = await config(env);
  }

  return mergeConfig(commonViteConfig(env), resolvedConfig);
};
