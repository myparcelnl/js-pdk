/* eslint-disable @typescript-eslint/no-explicit-any */
import type Liftoff from 'liftoff';
// eslint-disable-next-line no-duplicate-imports
import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArguments, type ParsedCommand} from '../utils';
import {type CommandName} from '../constants';
import {type ResolvedPdkBuilderConfig} from './config';

export interface BaseCommandDefinition<Args = any> {
  name: CommandName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (args?: Args & AnyCommandArgs) => Promise<any>;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any[];
  args?: string[][];
}

export interface CommandDefinitionWithoutConfig<Args = any> extends BaseCommandDefinition<Args> {
  hasConfig?: false;
}

export type CommandDefinition<Args = any> = BaseCommandDefinition<Args> | CommandDefinitionWithoutConfig<Args>;

export type PdkBuilderCommand<Args extends AnyCommandArgs = AnyCommandArgs> = (
  context: PdkBuilderContext<Args>,
) => PromiseOr<void>;

export type PdkBuilderCommandWithoutConfig<Args extends AnyCommandArgs = AnyCommandArgs> = (
  context: PdkBuilderContextWithoutConfig<Args>,
) => PromiseOr<void>;

export type AnyCommandArgs = Record<string, unknown>;

export type CommandArgs = {
  arguments?: string[];
  dryRun?: boolean;
  parallel?: boolean;
  quiet?: boolean;
  verbose: number;
  version?: string;
};

export type CommandCb = (...args: CommandArguments) => void | Promise<void>;

export type CreateHook<Args extends AnyCommandArgs = AnyCommandArgs> = (
  env: Liftoff.LiftoffEnv,
  argv: string[],
) => (definition: CommandDefinition<Args>) => CommandCb;

export type ExecuteCommandContext = {
  env: LiftoffEnv;
  args: CommandArgs;
  debug?: PdkDebugger;
};

export type PdkBuilderContext<A extends AnyCommandArgs = AnyCommandArgs> = PdkBuilderContextWithoutConfig<A> & {
  config: ResolvedPdkBuilderConfig;
};

export type PdkBuilderContextWithoutConfig<A extends AnyCommandArgs = AnyCommandArgs> = ExecuteCommandContext & {
  args: ParsedCommand<A>;
  debug: PdkDebugger;
};

export type PdkDebugger = Debugger & {
  logTimeTaken: () => void;
};
