import {program} from 'commander';
import {type AnyCommandArgs, type CommandCb, type CommandDefinition} from '../../types/command';

export const registerCommand = <Args extends AnyCommandArgs = AnyCommandArgs>(
  definition: CommandDefinition<Args>,
  callback: (definition: CommandDefinition<Args>) => CommandCb,
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
