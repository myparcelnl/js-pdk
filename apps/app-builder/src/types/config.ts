import {type OneOrMore} from '@myparcel/ts-utils';
import {type VersionSource} from '../increment';
import {type NodePackageManager} from '../commands/upgrade/types';
import {type PdkPlatformName, type StringGenerator} from './common';
import {type CommandDefinition} from './command';

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
   * Translations configuration.
   */
  translations?: {
    additionalSheet?: number;
    documentId?: string;
    outDir?: string;
    sheetId?: number;
  };

  additionalCommands?: CommandDefinition[];
};

export type ResolvedPdkBuilderConfig = Required<Omit<PdkBuilderConfig, 'translations'>> & {
  translations: {
    additionalSheet?: number;
    documentId: string;
    outDir: string;
    sheetId: number;
  };
};
