import type Liftoff from 'liftoff';
import {type CommandDefinition, type PdkBuilderContextWithoutConfig} from '../../types';
import {type CommandArguments, parseCommand} from './parseCommand';
import {createDebugger} from './createDebugger';

export const parseCommandInput = async <O extends CommandDefinition>(
  definition: O,
  args: CommandArguments,
  env: Liftoff.LiftoffEnv,
): Promise<{
  command: O['action'];
  context: Parameters<O['action']>[0] & PdkBuilderContextWithoutConfig<Parameters<O['action']>[0]['args']>;
}> => {
  const command = (await definition.action()).default;

  const parsedArgs = parseCommand(args);

  return {
    command,
    context: {
      args: parsedArgs,
      debug: createDebugger(definition.name, {verbose: parsedArgs.verbose}),
      env,
    },
  };
};
