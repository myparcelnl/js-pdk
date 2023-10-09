import {program} from 'commander';
import {type CommandCb, type CommandDefinition} from '../types';

export const registerCommand = (
  definition: CommandDefinition,
  callback: (definition: CommandDefinition) => CommandCb,
) => {
  const command = program.command(definition.name).description(definition.description);

  if (definition.options) {
    definition.options.forEach((option) => {
      // @ts-expect-error todo
      command.option(...option);
    });
  }

  if (definition.args) {
    definition.args.forEach((argument) => {
      // @ts-expect-error todo
      command.argument(...argument);
    });
  }

  command.action(callback(definition));
};
