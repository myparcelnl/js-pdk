import {type OneOrMore} from '@myparcel/ts-utils';
import {type CommandName, type PdkPlatformName} from '../constants';
import {type NodePackageManager} from '../commands/upgrade/enums';
import {type VersionSource} from '../commands/increment/increment.types';
import {type StringGenerator} from './common.types';
import {
  type CommandDefinition,
  type PdkBuilderCommand,
  type PdkBuilderCommandWithoutConfig,
  type PdkBuilderContext,
} from './command.types';

type CommandHooks = Record<
  CommandName,
  (params: {command: PdkBuilderCommandWithoutConfig | PdkBuilderCommand; context: PdkBuilderContext}) => Promise<void>
>;

type CommandHooksObject = {
  [K in CommandName as `before${Capitalize<K>}`]?: CommandHooks[K];
} & {
  [K in CommandName as `after${Capitalize<K>}`]?: CommandHooks[K];
};

export type PdkBuilderConfig = {
  /**
   * Filename for the final compress file. Must include file extension.
   *
   * @default `{{platform}}-{{name}}-{{version}}.zip`
   */
  archiveFilename?: StringGenerator;

  /**
   * Enable debug logging.
   */
  debug?: boolean;

  /**
   * Number of spaces to use for JSON formatting.
   */
  jsonSpaces?: number;

  /**
   * Name of the plugin.
   */
  name: StringGenerator;

  /**
   * Output directory for the created folders and archives.
   *
   * @default `dist`
   */
  outDir?: string;

  /**
   * Directory to use for caching and other temporary stuff.
   *
   * @default `.tmp`
   */
  tmpDir?: string;

  /**
   * Filename for the final folder that will end up in the archive.
   *
   * @default `{{name}}-{{version}}`
   */
  platformFolderName?: StringGenerator;

  /**
   * Platforms to build for.
   */
  platforms: PdkPlatformName[];

  /**
   * Glob patterns to include in final folder.
   */
  source: string[];

  /**
   * Version of the plugin.
   */
  version?: string;

  /**
   * Glob patterns to replace version numbers in. Optionally pass a regex to match only a part of the file.
   */
  versionSource: VersionSource[];

  /**
   * Node package manager to use. Defaults to `yarn`.
   *
   * Supported package managers:
   * - yarn >= 3.0.0 (berry)
   * - bun
   */
  nodePackageManager?: NodePackageManager;

  /**
   * Command to run the docker container that contains binaries for `dockerCommands`.
   * @see dockerCommands
   * @example 'docker compose run --rm -T php'
   */
  dockerCommand?: OneOrMore<string>;

  /**
   * Commands that should be run with the docker command. Defaults to `['composer', 'php']`.
   * @see dockerCommand
   */
  dockerCommands?: (string | RegExp)[];

  /**
   * Translations configuration.
   */
  translations?: {
    /**
     * The document ID for the pdk translations sheet.
     */
    documentId?: string;

    /**
     * The sheet ID for the pdk translations sheet.
     */
    sheetId?: number;

    /**
     * An additional sheet to import translations from the pdk translations sheet.
     */
    additionalSheet?: number;

    /**
     * Directory to save the pdk translations in.
     */
    outDir?: string;

    /**
     * The document ID for the delivery options sheet.
     */
    documentIdDeliveryOptions?: string;

    /**
     * The sheet ID for the delivery options sheet.
     */
    sheetIdDeliveryOptions?: number;
  };

  /**
   * Php scoper configuration. If enabled, humbug/php-scoper will be run before copying files.
   *
   * Requires a `scoper.inc.php` file in the root of the project.
   *
   * @see https://github.com/humbug/php-scoper
   */
  phpScoper?: {
    /**
     * Whether to prefix php files with humbug/php-scoper. If `null`, it will be enabled if `configFile` is found.
     *
     * @default `null`
     */
    enabled?: boolean | null;

    /**
     * Config file to use.
     *
     * @default `scoper.inc.php`
     */
    configFile?: string;

    /**
     * Config file to use for vendor files.
     *
     * @default `scoper.vendor.inc.php`
     */
    vendorConfigFile?: string;

    /**
     * Version of humbug/php-scoper to use. Must be a valid version string or range.
     *
     * @default `^0.17.5`
     */
    version?: string;

    /**
     * Directory humbug/php-scoper is saved in.
     *
     * @default `{{tmpDir}}/php-scoper`
     */
    installDir?: string;

    /**
     * Directory to save the prefixed files in.
     *
     * @default `{{tmpDir}}/scoped/source`
     */
    outDir?: string;

    /**
     * Directory to save the prefixed vendor files in.
     * @default `{{tmpDir}}/scoped/vendor`
     */
    vendorOutDir?: string;
  };

  /**
   * Commit type to use when running the `upgrade` command. Set to auto to compute the commit type based on the
   * upgraded versions.
   */
  commitType?: string | 'auto' | 'chore' | 'feat' | 'fix';

  /**
   * Define additional custom commands on the pdk builder.
   */
  additionalCommands?: CommandDefinition[];

  /**
   * Hooks to execute before or after other commands. Works with custom commands added with `additionalCommands` as well.
   * Key format: `before${CommandName}`/`after${CommandName}`.
   *
   * @example
   *  hooks: {
   *    afterCopy: async ({command, context}) => {
   *      console.log('Do something after copying files');
   *    },
   *  }
   */
  hooks?: CommandHooksObject;

  /**
   * Command to use when running composer.
   * @deprecated Will be removed in v2.0.0.
   * @TODO: Remove in v2.0.0
   */
  composerCommand?: OneOrMore<string>;

  /**
   * Command to use when running the node package manager. Has a default value based on `nodePackageManager`.
   * @deprecated Will be removed in v2.0.0.
   */
  nodePackageManagerCommand?: OneOrMore<string>;

  /**
   * Command to run a docker container.
   * @deprecated use `dockerCommand` instead. Will be removed in v2.0.0.
   * @TODO: Remove in v2.0.0
   */
  rootCommand?: OneOrMore<string>;

  /**
   * Commands that should be run with the docker command. Defaults to `['composer', 'php']`.
   * @deprecated use `dockerCommands` instead. Will be removed in v2.0.0.
   */
  rootCommands?: (string | RegExp)[];

  /**
   * Command to use when running yarn.
   * @deprecated Use `nodePackageManagerCommand` instead. Will be removed in v2.0.0.
   * @TODO: Remove in v2.0.0
   */
  yarnCommand?: OneOrMore<string>;
};

export type ResolvedPdkBuilderConfig = Required<
  Omit<
    PdkBuilderConfig,
    | 'hooks'
    | 'translations'
    // TODO: Remove deprecated properties in v2.0.0
    | 'rootCommand'
    | 'rootCommands'
    | 'yarnCommand'
  >
> & {
  hooks?: CommandHooksObject;
  phpScoper: Required<PdkBuilderConfig['phpScoper']>;
  translations: {
    documentId: string;
    sheetId: number;
    additionalSheet?: number;
    outDir: string;
    documentIdDeliveryOptions: string;
    sheetIdDeliveryOptions: number;
  };
};
