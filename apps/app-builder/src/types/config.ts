import {type OneOrMore} from '@myparcel/ts-utils';
import {type VersionSource} from '../increment';
import {type CommandName} from '../constants';
import {type NodePackageManager} from '../commands/upgrade/types';
import {type PdkPlatformName, type StringGenerator} from './common';
import {
  type CommandDefinition,
  type PdkBuilderCommand,
  type PdkBuilderCommandWithoutConfig,
  type PdkBuilderContext,
} from './command';

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
   * Command to use when running the node package manager. Has a default value based on `nodePackageManager`.
   */
  nodePackageManagerCommand?: OneOrMore<string>;

  /**
   * Command to use when running yarn.
   * @deprecated Use `nodePackageManagerCommand` instead. Will be removed in v1.0.0.
   */
  yarnCommand?: OneOrMore<string>;

  /**
   * Command to use when running composer.
   */
  composerCommand?: OneOrMore<string>;

  /**
   * Command to prepend to all commands.
   */
  rootCommand?: OneOrMore<string>;

  /**
   * Commands that should be run with the root command. Defaults to `['composer', 'php']`.
   */
  rootCommands?: (string | RegExp)[];

  /**
   * Translations configuration.
   */
  translations?: {
    additionalSheet?: number;
    documentId?: string;
    outDir?: string;
    sheetId?: number;
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

  additionalCommands?: CommandDefinition[];

  hooks?: CommandHooksObject;
};

export type ResolvedPdkBuilderConfig = Required<Omit<PdkBuilderConfig, 'translations' | 'hooks'>> & {
  hooks?: CommandHooksObject;
  phpScoper: Required<PdkBuilderConfig['phpScoper']>;
  translations: {
    additionalSheet?: number;
    documentId: string;
    outDir: string;
    sheetId: number;
  };
};
