import {type PdkBuilderConfig} from '../../types/config.types';
import {
  type AnyCommandDefinition,
  type DefaultCommandArgs,
  type PdkBuilderCommand,
  type PdkBuilderContext,
} from '../../types/command.types';
import {VerbosityLevel} from '../../constants';

export const runHooks = async <Args extends DefaultCommandArgs>(
  type: 'before' | 'after',
  definition: AnyCommandDefinition<Args>,
  context: PdkBuilderContext<Args>,
  command: PdkBuilderCommand<Args>,
): Promise<void> => {
  const commandName = definition.name;
  const capitalizedCommandName = commandName.charAt(0).toUpperCase() + commandName.slice(1);
  const hookName = `${type}${capitalizedCommandName}` as keyof PdkBuilderConfig['hooks'];

  if (context.args.verbose >= VerbosityLevel.Verbose && (context.config.hooks?.[hookName] ?? null)) {
    context.debug(`Running hook ${hookName}`);
  }

  // @ts-expect-error todo
  await context.config.hooks?.[hookName]?.({command, context});
};
