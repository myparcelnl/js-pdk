import {isOfType} from '@myparcel/ts-utils';
import {
  type AnyCommandArgs,
  type AnyCommandDefinition,
  type CommandDefinitionWithoutConfig,
} from '../types/command.types';
import {CONFIG_OPTIONS, OPTION_DRY_RUN, OPTION_QUIET, OPTION_VERBOSITY} from '../constants';

export const defineCommand = <
  Args = AnyCommandArgs,
  Definition extends AnyCommandDefinition<Args> = AnyCommandDefinition<Args>,
>(
  definition: Definition,
): AnyCommandDefinition<Args> => {
  const resolvedDefinition = {
    ...definition,
    options: [OPTION_DRY_RUN, OPTION_QUIET, OPTION_VERBOSITY, ...(definition.options ?? [])],
  };

  if (!isOfType<CommandDefinitionWithoutConfig>(definition, 'hasConfig')) {
    resolvedDefinition.options?.unshift(...CONFIG_OPTIONS);
  }

  return resolvedDefinition;
};
