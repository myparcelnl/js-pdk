import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types';
import {DEFAULT_JSON_SPACES} from '../constants';

export const mergeDefaultConfig = (config: PdkBuilderConfig): ResolvedPdkBuilderConfig => ({
  additionalCommands: [],
  archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
  composerCommand: 'composer',
  debug: false,
  jsonSpaces: DEFAULT_JSON_SPACES,
  outDir: 'dist',
  platformFolderName: '{{platform}}-{{name}}',
  version: '0.0.0',
  yarnCommand: 'yarn',
  ...config,
  translations: {
    documentId: '1TPE7gwG2GXtX7vlKIaskwMy0Xr4o_ir-lsedWB86xyc',
    outDir: 'config/pdk/translations',
    sheetId: 0,
    ...config.translations,
  },
});
