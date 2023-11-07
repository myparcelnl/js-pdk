// noinspection JSUnusedGlobalSymbols

import {type PdkBuilderConfig} from './types';

export type {PdkBuilderCommand, StringGenerator} from './types';

export type {PdkBuilderConfig};

export {COMMIT_TYPE_AUTO} from './constants';

export {PdkPlatformName} from './types';

export {
  addPlatformToContext,
  copyFile,
  executeCommand,
  executePromises,
  exists,
  getFileContents,
  getPlatformDistPath,
  getRelativePath,
  globFiles,
  isEmptyDir,
  isVerbose,
  isVeryVerbose,
  isVeryVeryVerbose,
  logPlatforms,
  logRelativePath,
  logSourcePath,
  logTargetPath,
  mkdirs,
  parseJsonFile,
  renameFile,
  reportDirectoryDoesNotExist,
  reportDirectoryExists,
  reportFileDoesNotExist,
  reportFileExists,
  resolvePath,
  resolveString,
  resolveStrings,
  rmDir,
  rmFile,
  shouldModifyFiles,
  writeFile,
} from './utils';

export const defineConfig = <C extends PdkBuilderConfig | (() => PdkBuilderConfig)>(config: C): C => config;
