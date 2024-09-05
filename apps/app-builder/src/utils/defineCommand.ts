import {isOfType} from '@myparcel/ts-utils';
import {type AnyCommandArgs, type CommandDefinition, type CommandDefinitionWithoutConfig} from '../types/command';
import {CONFIG_OPTIONS, OPTION_DRY_RUN, OPTION_QUIET, OPTION_VERBOSITY} from '../constants';

export const defineCommand = <
  Args = AnyCommandArgs,
  Definition extends CommandDefinition<Args> = CommandDefinition<Args>,
>(
  definition: Definition,
): CommandDefinition<Args> => {
  const resolvedDefinition = {
    ...definition,
    options: [OPTION_DRY_RUN, OPTION_QUIET, OPTION_VERBOSITY, ...(definition.options ?? [])],
  };

  if (!isOfType<CommandDefinitionWithoutConfig>(definition, 'hasConfig')) {
    resolvedDefinition.options?.unshift(...CONFIG_OPTIONS);
  }

  return resolvedDefinition;
};
