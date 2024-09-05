import {type CreateHook, type PdkBuilderContext} from '../../types/command';
import {parseCommandInput} from './parseCommandInput';

export const createWithContext: CreateHook<Omit<PdkBuilderContext, 'config'>> = (env) => {
  return (definition) => {
    return async (...args) => {
      const {command, context} = await parseCommandInput(definition, args, env);

      await command(context);

      context.debug.logTimeTaken();
    };
  };
};
