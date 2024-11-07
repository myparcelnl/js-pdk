import type Liftoff from 'liftoff';
import {resolveConfig} from '../resolveConfig';
import {mergeDefaultConfig} from '../mergeDefaultConfig';
import {
  type AnyCommandArgs,
  type AnyCommandDefinition,
  type DefaultCommandArgs,
  type InputCommandArguments,
  type PdkBuilderCommand,
  type PdkBuilderContext,
} from '../../types/command.types';
import {parseCommandInput} from './parseCommandInput';

type CommandContext<Args extends AnyCommandArgs = DefaultCommandArgs> = {
  command: PdkBuilderCommand<Args>;
  context: PdkBuilderContext<Args>;
};

export const createCommandContext = async <Args extends AnyCommandArgs = DefaultCommandArgs>(
  definition: AnyCommandDefinition<Args>,
  args: InputCommandArguments<Args>,
  env: Liftoff.LiftoffEnv,
): Promise<CommandContext<Args>> => {
  const {command, context} = await parseCommandInput(definition, args, env);

  const config = await resolveConfig(env, context.args);

  return {
    command,
    context: {
      ...context,
      config: mergeDefaultConfig(config),
    },
  };
};
