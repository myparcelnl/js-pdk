import {Options} from 'tsup';
import {RecursivePartial} from '@myparcel/ts-utils';
import {commonTsupConfig} from './commonTsupConfig';
import {mergeConfig} from 'vite';

type CreateTsupConfig = (config?: RecursivePartial<Options>) => Options;

export const createTsupConfig: CreateTsupConfig = (config) => {
  const resolvedConfig: RecursivePartial<Options> = config ?? {};

  return mergeConfig(commonTsupConfig, resolvedConfig);
};
