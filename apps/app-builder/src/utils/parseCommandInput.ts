import type Liftoff from 'liftoff';
import {
  type PdkBuilderCommand,
  type PdkBuilderCommandWithoutConfig,
  type PdkBuilderContextWithoutConfig,
} from '../types';
import {type CommandArguments, parseCommand} from './parseCommand';
import {createDebugger} from './createDebugger';

export const parseCommandInput = async <O extends PdkBuilderCommandWithoutConfig | PdkBuilderCommand>(
  callback: () => Promise<{
    default: O;
  }>,
  args: CommandArguments,
  env: Liftoff.LiftoffEnv,
): Promise<{
  command: O;
  context: PdkBuilderContextWithoutConfig;
}> => {
  const command = (await callback()).default;

  const parsedArgs = parseCommand(args);

  return {
    command,
    context: {
      args: parsedArgs,
      debug: createDebugger(parsedArgs.command.name(), {verbose: parsedArgs.verbose}),
      env,
    },
  };
};
