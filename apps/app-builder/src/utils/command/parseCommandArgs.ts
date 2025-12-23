import {type Command} from 'commander';
import {isOfType} from '@myparcel-dev/ts-utils';
import {
  type AnyCommandArgs,
  type DefaultCommandArgs,
  type InputCommandArguments,
  type ParsedCommandArguments,
} from '../../types/command.types';

export const parseCommandArgs = <Args extends AnyCommandArgs = DefaultCommandArgs>(
  args: InputCommandArguments<Args>,
): ParsedCommandArguments<Args> =>
  args.reduce((acc: ParsedCommandArguments<Args>, arg) => {
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
  }, {} as ParsedCommandArguments<Args>);
