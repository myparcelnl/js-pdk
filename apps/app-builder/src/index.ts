// noinspection JSUnusedGlobalSymbols

import {type PdkBuilderConfig} from './types';

export type {PdkBuilderCommand, StringGenerator} from './types';

export type {PdkBuilderConfig};

export {PdkPlatformName} from './types';

export {
  addPlatformToContext,
  copyFile,
  createDirectory,
  executeCommand,
  executePromises,
  exists,
  getFileContents,
  getPlatformDistPath,
  mkdirs,
  resolvePath,
  resolveString,
  resolveStrings,
} from './utils';

export const defineConfig = <C extends PdkBuilderConfig | (() => PdkBuilderConfig)>(config: C): C => config;
