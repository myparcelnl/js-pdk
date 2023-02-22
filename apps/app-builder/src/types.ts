import {LiftoffEnv} from 'liftoff';
import {PromiseOr} from '@myparcel/ts-utils';

export type PdkBuilderConfig = {
  /**
   * Name of the plugin.
   */
  name: string;

  /**
   * Version of the plugin.
   */
  version: string;

  /**
   * Filename for the final compress file. Must include file extension.
   *
   * @default `{{platform}}-{{name}}-{{version}}.zip`
   */
  archiveFilename?: string;

  /**
   * Enable debug logging.
   */
  debug?: boolean;

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
  platformFolderName?: string;

  /**
   * Platforms to build for.
   */
  platforms: string[];

  /**
   * Glob patterns to include in final folder.
   */
  source: string[];
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
  quiet?: boolean;
  verbose: number;
};

export enum Verbosity {
  VERBOSE = 1,
  VERY_VERBOSE = 2,
  VERY_VERY_VERBOSE = 3,
}
