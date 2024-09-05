import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type PdkBuilderConfig} from '../../types/config';

export const createCommand = (config: PdkBuilderConfig, command: OneOrMore<string>): string => {
  const resolvedCommand = toArray(command ?? []);
  const [firstCommand] = resolvedCommand;

  const rootCommands = toArray(config.rootCommands ?? []);

  const present = rootCommands.some((rootCommand) => {
    return typeof rootCommand === 'string' ? rootCommand === firstCommand : rootCommand.test(firstCommand);
  });

  const commandList = [];

  if (present) {
    const resolvedRootCommand = toArray(config.rootCommand ?? []);

    commandList.push(...resolvedRootCommand);
  }

  commandList.push(...resolvedCommand);

  return commandList.filter(Boolean).join(' ');
};
