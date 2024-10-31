/* eslint-disable @typescript-eslint/no-explicit-any */
import type Liftoff from 'liftoff';
// eslint-disable-next-line no-duplicate-imports
import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type Command} from 'commander';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type CommandName, type PdkPlatformName} from '../constants';
import {type ResolvedPdkBuilderConfig} from './config.types';

export interface BaseCommandDefinition<Args = any> {
  name: CommandName;
  action: (args?: Args & AnyCommandArgs) => Promise<any>;
  description: string;
  options?: any[];
  args?: string[][];
}

export interface CommandDefinitionWithoutConfig<Args = any> extends BaseCommandDefinition<Args> {
  hasConfig?: false;
}

export type CommandDefinition<Args = any> = BaseCommandDefinition<Args> | CommandDefinitionWithoutConfig<Args>;

export type PdkBuilderCommand<Args extends AnyCommandArgs = CommandArgs> = (
  context: PdkBuilderContext<Args>,
) => PromiseOr<void>;

export type PdkBuilderCommandWithoutConfig<Args extends AnyCommandArgs = CommandArgs> = (
  context: PdkBuilderContextWithoutConfig<Args>,
) => PromiseOr<void>;

export type AnyCommandArgs = Record<string, unknown>;

export type CommandArgs = {
  arguments?: string[];
  dryRun?: boolean;
  parallel?: boolean;
  quiet?: boolean;
  verbose: number;
};

type PlatformArgs<Platform extends PdkPlatformName = PdkPlatformName> = {
  platform: Platform;
  platformOutDir: string;
};

export type CommandArguments = (string | (CommandArgs & AnyCommandArgs) | Command)[];

export type ParsedCommand<A extends Record<string, unknown> = Record<string, unknown>> = CommandArgs &
  A & {
    arguments?: string[];
    command: Command;
  };

export type CommandCb = (...args: CommandArguments) => void | Promise<void>;

export type CreateHook<Args extends AnyCommandArgs = CommandArgs> = (
  env: Liftoff.LiftoffEnv,
  argv: string[],
) => (definition: CommandDefinition<Args>) => CommandCb;

export type BaseCommandContext<Args extends AnyCommandArgs = CommandArgs> = {
  env: LiftoffEnv;
  args: Args;
  debug?: PdkDebugger;
};

export type PdkBuilderContextWithoutConfig<Args extends AnyCommandArgs = CommandArgs> = BaseCommandContext<Args> & {
  args: ParsedCommand<Args>;
  debug: PdkDebugger;
};

export type PdkBuilderContext<Args extends AnyCommandArgs = CommandArgs> = PdkBuilderContextWithoutConfig<
  Args & Partial<PlatformArgs>
> & {
  config: ResolvedPdkBuilderConfig;
};

export type PdkBuilderContextWithPlatformArgs<
  Args extends AnyCommandArgs = CommandArgs,
  Platform extends PdkPlatformName = PdkPlatformName,
> = PdkBuilderContext<PlatformArgs<Platform> & Args>;

export type PdkDebugger = Debugger & {
  logTimeTaken(): void;
};
