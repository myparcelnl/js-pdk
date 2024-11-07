import {type AnyCommandDefinition} from './command.types';

type CommandArguments<Cd extends AnyCommandDefinition> = Cd extends AnyCommandDefinition<infer Args> ? Args : never;

export type CommandWithArguments<Command extends AnyCommandDefinition = AnyCommandDefinition> =
  | [Command, Partial<CommandArguments<Command>>];

export type CommandWithOrWithoutArguments<Command extends AnyCommandDefinition = AnyCommandDefinition> =
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
