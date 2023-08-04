import {type CreateHook, type WithConfigParams} from '../types';
import {resolveConfig} from './resolveConfig';
import {parseCommandInput} from './parseCommandInput';
import {mergeDefaultConfig} from './mergeDefaultConfig';

export const createWithConfig: CreateHook<WithConfigParams> = (env) => {
  return (callback) => {
    return async (...args) => {
      const config = await resolveConfig(env);
      const {command, context} = await parseCommandInput(callback, args, env);

      await command({
        ...context,
        config: mergeDefaultConfig(config),
      });

      context.debug.logTimeTaken();
    };
  };
};
