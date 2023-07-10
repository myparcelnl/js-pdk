import type Liftoff from 'liftoff';
// eslint-disable-next-line no-duplicate-imports
import {type LiftoffEnv} from 'liftoff';
import {type Debugger} from 'debug';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type CommandArguments, type ParsedCommand} from '../utils';
import {type ResolvedPdkBuilderConfig} from './config';

export type PdkBuilderContext<A extends AnyCommandArgs = AnyCommandArgs> = {
  args: ParsedCommand<A>;
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
};

export type PdkBuilderCommand<A extends AnyCommandArgs = AnyCommandArgs> = (
  context: PdkBuilderContext<A>,
) => PromiseOr<void>;

export type PdkBuilderCommandWithoutConfig<A extends AnyCommandArgs = AnyCommandArgs> = (
  context: Omit<PdkBuilderContext<A>, 'config'>,
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

export type CreateHook<T> = (env: Liftoff.LiftoffEnv, argv: string[]) => (callback: T) => CommandCb;

export interface ExecuteCommandContext {
  env: LiftoffEnv;
  args: CommandArgs;
  debug?: Debugger;
}
