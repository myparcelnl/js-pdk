import {type Command} from 'commander';
import {isOfType} from '@myparcel/ts-utils';
import {type CommandArguments, type ParsedCommand} from '../../types/command.types';

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
