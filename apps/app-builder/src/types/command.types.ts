/* eslint-disable @typescript-eslint/no-explicit-any */
import type Liftoff from 'liftoff';
// eslint-disable-next-line no-duplicate-imports
import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type Command} from 'commander';
import {type PromiseOr, type Replace} from '@myparcel/ts-utils';
import {type CommandName, type PdkPlatformName} from '../constants';
import {type ResolvedPdkBuilderConfig} from './config.types';

export interface BaseCommandDefinition<Args extends AnyCommandArgs = DefaultCommandArgs> {
  name: CommandName;
  description: string;
  options?: any[];
  args?: string[][];

  action(): Promise<{default: PdkBuilderCommand<Args>}>;
}

export interface CommandDefinitionWithoutConfig<Args extends AnyCommandArgs = DefaultCommandArgs>
  extends BaseCommandDefinition<Args> {
  hasConfig?: false;
}

export type AnyCommandDefinition<Args extends AnyCommandArgs = DefaultCommandArgs> =
  | BaseCommandDefinition<Args>
  | CommandDefinitionWithoutConfig<Args>;

export type AdditionalCommandDefinition<Args extends AnyCommandArgs = DefaultCommandArgs> = Replace<
  AnyCommandDefinition<Args>,
  'action',
  PdkBuilderCommand<Args>
>;

export type PdkBuilderCommand<
  Args extends AnyCommandArgs = DefaultCommandArgs,
  Context extends BasePdkBuilderContext<Args> = BasePdkBuilderContext<Args>,
> = (context: Context) => PromiseOr<void>;

export type PdkBuilderCommandWithoutConfig<Args extends AnyCommandArgs = DefaultCommandArgs> = (
  context: BasePdkBuilderContext<Args>,
) => PromiseOr<void>;

export type AnyCommandArgs = Record<string, unknown>;

export type DefaultCommandArgs = {
  arguments?: string[];
  dryRun?: boolean;
  parallel?: boolean;
  quiet?: boolean;
  verbose: number;
};

export type PlatformCommandArgs<Platform extends PdkPlatformName = PdkPlatformName> = {
  platform: Platform;
  platformOutDir: string;
};

export type InputCommandArguments<Args extends AnyCommandArgs = DefaultCommandArgs> = (
  | string
  | (DefaultCommandArgs & Args)
  | Command
)[];

export type ParsedCommandArguments<Args extends AnyCommandArgs = DefaultCommandArgs> = DefaultCommandArgs &
  Args & {
    arguments?: string[];
    command: Command;
  };

export type CommandCb = (...args: InputCommandArguments) => void | Promise<void>;

export type CreateHook<Definition extends AnyCommandDefinition> = (
  env: Liftoff.LiftoffEnv,
) => (definition: Definition) => CommandCb;

export type BaseCommandContext<Args extends AnyCommandArgs = DefaultCommandArgs> = {
  env: LiftoffEnv;
  args: Args;
  debug?: PdkDebugger;
};

export type BasePdkBuilderContext<Args extends AnyCommandArgs = DefaultCommandArgs> = BaseCommandContext<Args> & {
  args: ParsedCommandArguments<Args>;
  debug: PdkDebugger;
};

export type PdkBuilderContext<Args extends AnyCommandArgs = DefaultCommandArgs> = BasePdkBuilderContext<
  Args & Partial<PlatformCommandArgs>
> & {
  config: ResolvedPdkBuilderConfig;
};

export type PdkBuilderContextWithPlatformArgs<
  Args extends AnyCommandArgs = DefaultCommandArgs,
  Platform extends PdkPlatformName = PdkPlatformName,
> = PdkBuilderContext<PlatformCommandArgs<Platform> & Args>;

export type PdkDebugger = Debugger & {
  logTimeTaken(): void;
};
