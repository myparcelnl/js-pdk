import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {type PdkBuilderConfig} from '../../types/config.types';

export const createCommand = (config: PdkBuilderConfig, command: OneOrMore<string>): string => {
  const resolvedCommand = toArray(command ?? []);
  const [firstCommand] = resolvedCommand;

  const dockerCommands = toArray(config.dockerCommands ?? []);

  const isDockerCommand = dockerCommands.some((dockerCommand) => {
    return typeof dockerCommand === 'string' ? dockerCommand === firstCommand : dockerCommand.test(firstCommand);
  });

  const commandList = [];

  if (isDockerCommand) {
    const resolvedDockerCommand = toArray(config.dockerCommand ?? []);

    commandList.push(...resolvedDockerCommand);
  }

  commandList.push(...resolvedCommand);

  return commandList.filter(Boolean).join(' ');
};
