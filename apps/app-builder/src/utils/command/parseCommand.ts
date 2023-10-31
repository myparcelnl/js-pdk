import {type Command} from 'commander';
import {isOfType} from '@myparcel/ts-utils';
import {type AnyCommandArgs, type CommandArgs} from '../../types';

export type CommandArguments = (string | (CommandArgs & AnyCommandArgs) | Command)[];

export type ParsedCommand<A extends Record<string, unknown> = Record<string, unknown>> = CommandArgs &
  A & {
    arguments?: string[];
    command: Command;
  };

export const parseCommand = (args: CommandArguments): ParsedCommand =>
  args.reduce((acc: ParsedCommand, arg) => {
    if (isOfType<Command>(arg, 'on')) {
      const command = arg;

      return {
        ...acc,
        command,
      };
    }

    if (typeof arg === 'object') {
      return {...acc, ...arg};
    }

    if (typeof arg === 'string') {
      acc.arguments = acc.arguments ?? [];
      acc.arguments.push(arg);
      return acc;
    }

    return acc;
  }, {} as ParsedCommand);
