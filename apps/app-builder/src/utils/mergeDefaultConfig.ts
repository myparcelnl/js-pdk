import {type PdkBuilderConfig} from '../types';

const DEFAULT_JSON_SPACES = 2;

export const mergeDefaultConfig = (config: PdkBuilderConfig): Required<PdkBuilderConfig> => ({
  archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
  debug: false,
  jsonSpaces: DEFAULT_JSON_SPACES,
  outDir: 'dist',
  platformFolderName: '{{platform}}-{{name}}',
  ...config,
});
