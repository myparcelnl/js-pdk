import {spawnSync, type SpawnSyncOptions, type SpawnSyncOptionsWithStringEncoding} from 'child_process';
import {type LiftoffEnv} from 'liftoff';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';

export interface ExecuteCommandContext {
  env: LiftoffEnv;
}

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

    const {status, stdout, stderr} = spawnSync(commandName, commandArgs ?? [], resolvedOptions);

    if (status === 0) {
      resolve(stdout);
    } else {
      reject(stderr);
    }
  });
};
