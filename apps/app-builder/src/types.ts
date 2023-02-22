import {LiftoffEnv} from 'liftoff';
import {PromiseOr} from '@myparcel/ts-utils';

export type PdkBuilderConfig = {
  name: string;
  version: string;
  description: string;

  /**
   * Filename for the final zip file. Defaults to `:platform-:name-:version`.
   */
  zipFileName?: string;

  /**
   * Enable debug logging.
   */
  debug?: boolean;

  /**
   * Dist folder. Defaults to `./dist`.
   */
  distFolder?: string;

  /**
   * Platforms to include.
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
  debug?: boolean;
};
