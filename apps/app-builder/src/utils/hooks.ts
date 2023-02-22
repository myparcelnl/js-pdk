import {CommandArgs, PdkBuilderContext} from '../types';
import Liftoff from 'liftoff';
import {mergeDefaultConfig} from './mergeDefaultConfig';
import {resolveConfig} from './resolveConfig';

type WithContextParams = <A extends CommandArgs>(context: Omit<PdkBuilderContext<A>, 'config'>) => Promise<void> | void;

type WithConfigParams = <A extends CommandArgs>(context: PdkBuilderContext<A>) => Promise<void> | void;

type CommandCb<A = Record<string, unknown>> = (cmd: string, args: A) => void | Promise<void>;

type CreateHook<T, A = Record<string, unknown>> = (
  env: Liftoff.LiftoffEnv,
  argv: string[],
) => (callback: T) => CommandCb<A>;

export const createWithContext: CreateHook<WithContextParams, CommandArgs> = (env) => {
  return (callback) => {
    return async (_, args) => callback({env: env, args});
  };
};

export const createWithConfig: CreateHook<WithConfigParams, CommandArgs> = (env) => {
  return (callback) => {
    return async (_, args) => {
      const config = await resolveConfig(env);

      return callback({config: mergeDefaultConfig(config), env: env, args});
    };
  };
};
