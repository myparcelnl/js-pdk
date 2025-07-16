// noinspection SpellCheckingInspection

import {type PdkBuilderConfig, type ResolvedPdkBuilderConfig} from '../types/config.types';
import {COMMIT_TYPE_AUTO, DEFAULT_JSON_SPACES, RUN_COMPOSER, RUN_PHP} from '../constants';
import {NodePackageManager} from '../commands/upgrade/enums';
import {PHP_SCOPER_CONFIG_FILE} from '../commands/scopePhp/constants';

// eslint-disable-next-line max-lines-per-function
export const mergeDefaultConfig = (config: PdkBuilderConfig): ResolvedPdkBuilderConfig => {
  const resolvedConfig = {
    additionalCommands: [],
    archiveFilename: '{{name}}-{{version}}.zip',
    commitType: COMMIT_TYPE_AUTO,
    debug: false,
    jsonSpaces: DEFAULT_JSON_SPACES,
    nodePackageManager: NodePackageManager.Yarn,
    outDir: 'dist',
    dockerCommand: undefined,
    dockerCommands: undefined,
    tmpDir: '.tmp',
    version: '0.0.0',

    ...config,
    phpScoper: {
      configFile: PHP_SCOPER_CONFIG_FILE,
      enabled: null,
      installDir: '{{tmpDir}}/php-scoper',
      outDir: '{{tmpDir}}/scoped/source',
      vendorConfigFile: 'scoper.vendor.inc.php',
      vendorOutDir: '{{tmpDir}}/scoped/vendor',
      version: '^0.17.5',
      ...config.phpScoper,
    },
    translations: {
      documentId: '1TPE7gwG2GXtX7vlKIaskwMy0Xr4o_ir-lsedWB86xyc',
      sheetId: 0,
      outDir: 'config/pdk/translations',
      documentIdDeliveryOptions: '1FjcT_eNLkbUXFpcm4nskdkBSsFWG7wAX9FDxrJwpOuc',
      sheetIdDeliveryOptions: 0,
      ...config.translations,
    },
  } satisfies PdkBuilderConfig;

  const {dockerCommand, dockerCommands} = resolvedConfig;

  return {
    ...resolvedConfig,
    dockerCommand: dockerCommand ?? '',
    dockerCommands: dockerCommands ?? [RUN_COMPOSER, RUN_PHP],
  } satisfies ResolvedPdkBuilderConfig;
};
