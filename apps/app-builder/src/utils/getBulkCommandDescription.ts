import {type BaseCommandDefinition} from '../types/command.types';

export const getBulkCommandDescription = (
  commandDefinitions: BaseCommandDefinition[],
  description: string | undefined,
): string => {
  const suffix = 'Requires a config file.';

  if (description) {
    return `${description} ${suffix}`;
  }

  const commandNames = commandDefinitions.map((definition) => definition.name).join(', ');

  return `Run ${commandNames} in sequence. ${suffix}`;
};
