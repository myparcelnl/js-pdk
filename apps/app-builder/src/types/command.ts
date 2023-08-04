import type Liftoff from 'liftoff';
// eslint-disable-next-line no-duplicate-imports
import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArguments, type ParsedCommand} from '../utils';
import {type ResolvedPdkBuilderConfig} from './config';

export type CommandDefinition = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => Promise<any>;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: any[];
  args?: string[][];
};

export type PdkBuilderCommand<A extends AnyCommandArgs = AnyCommandArgs> = (
  context: PdkBuilderContext<A>,
) => PromiseOr<void>;

export type PdkBuilderCommandWithoutConfig<A extends AnyCommandArgs = AnyCommandArgs> = (
  context: PdkBuilderContextWithoutConfig<A>,
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

export type WithContextParams = <A extends AnyCommandArgs>(
  context: Omit<PdkBuilderContext<A>, 'config'>,
) => Promise<void> | void;

export type WithConfigParams = <A extends AnyCommandArgs>(context: PdkBuilderContext<A>) => Promise<void> | void;

export type CommandCb = (...args: CommandArguments) => void | Promise<void>;

export type CreateHook<T> = (
  env: Liftoff.LiftoffEnv,
  argv: string[],
) => (callback: () => Promise<{default: T}>) => CommandCb;

export interface ExecuteCommandContext {
  env: LiftoffEnv;
  args: CommandArgs;
  debug?: PdkDebugger;
}

export interface PdkBuilderContext<A extends AnyCommandArgs = AnyCommandArgs>
  extends PdkBuilderContextWithoutConfig<A> {
  config: ResolvedPdkBuilderConfig;
}

export interface PdkBuilderContextWithoutConfig<A extends AnyCommandArgs = AnyCommandArgs>
  extends ExecuteCommandContext {
  args: ParsedCommand<A>;
  debug: PdkDebugger;
}

export type PdkDebugger = Debugger & {
  logTimeTaken: () => void;
};
