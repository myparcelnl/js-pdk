import {program} from 'commander';
import {type CommandCb, type CommandDefinition, type WithConfigParams} from '../types';

export const registerConfigCommand = (
  definition: CommandDefinition,
  withConfig: (
    callback: () => Promise<{
      default: WithConfigParams;
    }>,
  ) => CommandCb,
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

  command.action(withConfig(definition.action));
};
