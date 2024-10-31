import type Liftoff from 'liftoff';
import {
  type CommandArguments,
  type CommandDefinition,
  type PdkBuilderContextWithoutConfig,
} from '../../types/command.types';
import {parseCommand} from './parseCommand';
import {createDebugger} from './createDebugger';

export const parseCommandInput = async <O extends CommandDefinition>(
  definition: O,
  args: CommandArguments,
  env: Liftoff.LiftoffEnv,
): Promise<{
  command: O['action'];
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
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
