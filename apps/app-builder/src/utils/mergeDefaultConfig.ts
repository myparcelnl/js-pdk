import {type PdkBuilderConfig} from '../types';

const DEFAULT_JSON_SPACES = 2;

export const mergeDefaultConfig = (config: PdkBuilderConfig): Required<PdkBuilderConfig> => ({
  archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
  composerCommand: 'composer',
  debug: false,
  jsonSpaces: DEFAULT_JSON_SPACES,
  outDir: 'dist',
  platformFolderName: '{{platform}}-{{name}}',
  version: '0.0.0',
  yarnCommand: 'yarn',
  ...config,
});
