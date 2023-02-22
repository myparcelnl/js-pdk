import {PdkBuilderConfig} from '../types';

export const mergeDefaultConfig = (config: PdkBuilderConfig): Required<PdkBuilderConfig> => ({
  debug: false,
  outDir: 'dist',
  platformFolderName: '{{platform}}-{{name}}',
  archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
  ...config,
});
