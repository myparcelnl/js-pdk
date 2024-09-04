// noinspection JSUnusedGlobalSymbols

import {type PdkBuilderConfig} from './types';

export type {PdkBuilderCommand, StringGenerator} from './types';

export type {PdkBuilderConfig};

export {COMMIT_TYPE_AUTO} from './constants';

export {PdkPlatformName} from './constants';

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

export {defineConfig} from './defineConfig';
