import {type CommandDefinitionWithoutConfig, type CreateHook} from '../../types/command.types';
import {parseCommandInput} from './parseCommandInput';

export const createWithContext = ((env) => {
  return (definition) => {
    return async (...args) => {
      const {command, context} = await parseCommandInput(definition, args, env);

      await command(context);

      context.debug.logTimeTaken();
    };
  };
}) satisfies CreateHook<CommandDefinitionWithoutConfig>;
