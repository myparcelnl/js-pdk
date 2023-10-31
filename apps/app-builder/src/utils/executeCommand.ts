import {spawnSync, type SpawnSyncOptions, type SpawnSyncOptionsWithStringEncoding} from 'child_process';
import {isOfType, type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type ExecuteCommandContext, type PdkBuilderContext} from '../types';
import {VerbosityLevel} from '../constants';
import {createCommand} from './command/createCommand';

export const executeCommand = async (
  context: ExecuteCommandContext,
  command: OneOrMore<string>,
  args?: string[],
  options?: Omit<SpawnSyncOptions, 'encoding'>,
): Promise<string> => {
  const resolvedOptions: SpawnSyncOptionsWithStringEncoding = {
    encoding: 'utf-8',
    cwd: context.env.cwd,
    stdio: context.args.verbose >= VerbosityLevel.VeryVerbose ? 'inherit' : 'pipe',
    ...options,
  };

  return new Promise((resolve, reject) => {
    const resolvedCommand = isOfType<PdkBuilderContext>(context, 'config')
      ? toArray(createCommand(context.config, command))
      : toArray(command);

    const splitCommand = resolvedCommand.reduce((acc, command) => [...acc, ...command.split(' ')], [] as string[]);
    const allArgs = [...splitCommand, ...(args ?? [])].filter(Boolean);

    const [commandName, ...commandArgs] = allArgs;

    if (context.args.verbose >= VerbosityLevel.VeryVeryVerbose) {
      context.debug?.(
        `Executing command: ${commandName} ${commandArgs.join(' ')}${options?.cwd ? ` in ${options.cwd}` : ''}`,
      );
    }

    const {status, stdout, stderr} = spawnSync(commandName, commandArgs ?? [], resolvedOptions);

    if (status === 0) {
      resolve(stdout);
    } else {
      reject(stderr);
    }
  });
};
