import {type CreateHook, type WithConfigParams} from '../types';
import {resolveConfig} from './resolveConfig';
import {parseCommand} from './parseCommand';
import {mergeDefaultConfig} from './mergeDefaultConfig';

export const createWithConfig: CreateHook<WithConfigParams> = (env) => {
  return (callback) => {
    return async (...args) => {
      const config = await resolveConfig(env);

      return callback({
        config: mergeDefaultConfig(config),
        env,
        args: parseCommand(args),
      });
    };
  };
};
