import {type CommandDefinition} from './command.types';

type CommandArguments<Cd extends CommandDefinition> = Cd extends CommandDefinition<infer Args> ? Args : never;

export type CommandWithArguments<Command extends CommandDefinition = CommandDefinition> =
  | [Command, Partial<CommandArguments<Command>>];

export type CommandWithOrWithoutArguments<Command extends CommandDefinition = CommandDefinition> =
  | Command
  | CommandWithArguments<Command>;

export type BulkCommandDefinition = {
  name: string;
  description?: string;
  commands: CommandWithArguments[];
};

export type InputBulkCommandDefinition<Command extends CommandWithOrWithoutArguments> = {
  name: string;
  description?: string;
  commands: Command[];
};
