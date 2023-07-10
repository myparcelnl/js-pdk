import {spawnSync, type SpawnSyncOptions, type SpawnSyncOptionsWithStringEncoding} from 'child_process';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type ExecuteCommandContext} from '../types';
import {VerbosityLevel} from '../constants';

export const executeCommand = async (
  context: ExecuteCommandContext,
  command: OneOrMore<string>,
  args?: string[],
  options?: Omit<SpawnSyncOptions, 'encoding'>,
): Promise<string> => {
  const resolvedOptions: SpawnSyncOptionsWithStringEncoding = {
    encoding: 'utf-8',
    cwd: context.env.cwd,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const splitCommand = toArray(command).reduce((acc, command) => [...acc, ...command.split(' ')], [] as string[]);
    const allArgs = [...splitCommand, ...(args ?? [])];

    const [commandName, ...commandArgs] = allArgs;

    if (context.args.verbose >= VerbosityLevel.VeryVeryVerbose) {
      context.debug?.(`Executing command: ${commandName} ${commandArgs.join(' ')}`);
    }

    const {status, stdout, stderr} = spawnSync(commandName, commandArgs ?? [], resolvedOptions);

    if (status === 0) {
      resolve(stdout);
    } else {
      reject(stderr);
    }
  });
};
