import {type LiftoffEnv} from 'liftoff';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type VersionSource} from './increment';

export type StringGenerator = string | ((platform?: PdkPlatformName) => string);

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
  version: string;

  /**
   * Glob patterns to replace version numbers in. Optionally pass a regex to match only a part of the file.
   */
  versionSource: VersionSource[];
};

export type ResolvedPdkBuilderConfig = Required<PdkBuilderConfig>;

export type PdkBuilderContext<A extends CommandArgs = CommandArgs> = {
  args: A;
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
};

export type PdkBuilderCommand = (context: PdkBuilderContext) => PromiseOr<void>;

export type CommandArgs = {
  dryRun?: boolean;
  parallel?: boolean;
  quiet?: boolean;
  verbose: number;
  version?: string;
};

export enum PdkPlatformName {
  Flespakket = 'flespakket',
  MyParcelBe = 'myparcelbe',
  MyParcelNl = 'myparcelnl',
}
