import {toArray} from '@myparcel/ts-utils';
import {type CommandDefinition} from '../types';

type CommandArguments<Cd extends CommandDefinition> = Cd extends CommandDefinition<infer Args> ? Args : never;

type CommandWithArguments<Command extends CommandDefinition = CommandDefinition> =
  | [Command, Partial<CommandArguments<Command>>];

export type CommandWithOrWithoutArguments<Command extends CommandDefinition = CommandDefinition> =
  | Command
  | CommandWithArguments<Command>;

export type BulkCommandDefinition = {
  name: string;
  description?: string;
  commands: CommandWithArguments[];
};

type InputBulkCommandDefinition<Command extends CommandWithOrWithoutArguments> = {
  name: string;
  description?: string;
  commands: Command[];
};

export const defineBulkCommand = <Command extends CommandWithOrWithoutArguments>(
  definition: InputBulkCommandDefinition<Command>,
): BulkCommandDefinition => ({
  ...definition,
  commands: definition.commands.map((item) => toArray(item) as CommandWithArguments),
});
