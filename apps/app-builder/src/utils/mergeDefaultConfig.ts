import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types';
import {DEFAULT_JSON_SPACES} from '../constants';
import {NodePackageManager} from '../commands/upgrade/types';

export const mergeDefaultConfig = (config: PdkBuilderConfig): ResolvedPdkBuilderConfig => {
  const resolvedConfig = {
    additionalCommands: [],
    archiveFilename: '{{platform}}-{{name}}-{{version}}.zip',
    composerCommand: 'composer',
    debug: false,
    jsonSpaces: DEFAULT_JSON_SPACES,
    nodePackageManager: NodePackageManager.Yarn,
    nodePackageManagerCommand: undefined,
    outDir: 'dist',
    platformFolderName: '{{platform}}-{{name}}',
    rootCommand: '',
    rootCommands: ['composer', 'php'],
    tmpDir: '.tmp',
    version: '0.0.0',
    yarnCommand: undefined,
    ...config,
    phpScoper: {
      configFile: 'scoper.inc.php',
      enabled: null,
      installDir: '{{tmpDir}}/php-scoper',
      outDir: '{{tmpDir}}/build',
      version: '^0.17.5',
      ...config.phpScoper,
    },
    translations: {
      documentId: '1TPE7gwG2GXtX7vlKIaskwMy0Xr4o_ir-lsedWB86xyc',
      outDir: 'config/pdk/translations',
      sheetId: 0,
      ...config.translations,
    },
  };

  return {
    ...resolvedConfig,
    yarnCommand: resolvedConfig.yarnCommand ?? 'yarn',
    nodePackageManagerCommand:
      resolvedConfig.nodePackageManagerCommand ?? resolvedConfig.yarnCommand ?? resolvedConfig.nodePackageManager,
  };
};
