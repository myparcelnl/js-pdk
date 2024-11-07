import type Liftoff from 'liftoff';
import {
  type AnyCommandArgs,
  type AnyCommandDefinition,
  type BasePdkBuilderContext,
  type DefaultCommandArgs,
  type InputCommandArguments,
  type PdkBuilderCommandWithoutConfig,
} from '../../types/command.types';
import {parseCommandArgs} from './parseCommandArgs';
import {createDebugger} from './createDebugger';

type ParsedCommandInput<Args extends AnyCommandArgs = DefaultCommandArgs> = {
  command: PdkBuilderCommandWithoutConfig<Args>;
  context: BasePdkBuilderContext<Args>;
};

export const parseCommandInput = async <
  Args extends AnyCommandArgs = DefaultCommandArgs,
  Definition extends AnyCommandDefinition<Args> = AnyCommandDefinition<Args>,
>(
  definition: Definition,
  args: InputCommandArguments<Args>,
  env: Liftoff.LiftoffEnv,
): Promise<ParsedCommandInput<Args>> => {
  const command = (await definition.action()).default;
  const parsedArgs = parseCommandArgs(args);

  return {
    command,
    context: {
      args: parsedArgs,
      debug: createDebugger(definition.name, {verbose: parsedArgs.verbose}),
      env,
    },
  };
};
