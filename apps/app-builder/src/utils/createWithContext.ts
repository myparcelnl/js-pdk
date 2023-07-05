import {type CreateHook, type WithContextParams} from '../types';
import {parseCommand} from './parseCommand';

export const createWithContext: CreateHook<WithContextParams> = (env) => {
  return (callback) => {
    return async (...args) =>
      callback({
        env,
        args: parseCommand(args),
      });
  };
};
