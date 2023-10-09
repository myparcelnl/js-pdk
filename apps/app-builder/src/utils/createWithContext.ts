import {type CreateHook, type WithContextParams} from '../types';
import {parseCommandInput} from './parseCommandInput';

export const createWithContext: CreateHook<WithContextParams> = (env) => {
  return (definition) => {
    return async (...args) => {
      const {command, context} = await parseCommandInput(definition, args, env);

      await command(context);

      context.debug.logTimeTaken();
    };
  };
};
