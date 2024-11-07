import {program} from 'commander';
import {
  type AnyCommandArgs,
  type AnyCommandDefinition,
  type CommandCb,
  type DefaultCommandArgs,
} from '../../types/command.types';

export const registerCommand = <Args extends AnyCommandArgs = DefaultCommandArgs>(
  definition: AnyCommandDefinition<Args>,
  callback: (definition: AnyCommandDefinition<Args>) => CommandCb,
): void => {
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
