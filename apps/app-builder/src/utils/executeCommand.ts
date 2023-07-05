import {spawnSync, type SpawnSyncOptions, type SpawnSyncOptionsWithStringEncoding} from 'child_process';
import {type LiftoffEnv} from 'liftoff';

export interface ExecuteCommandContext {
  env: LiftoffEnv;
}

export const executeCommand = async (
  context: ExecuteCommandContext,
  command: string,
  args?: string[],
  options?: Omit<SpawnSyncOptions, 'encoding'>,
): Promise<string> => {
  const resolvedOptions: SpawnSyncOptionsWithStringEncoding = {
    encoding: 'utf-8',
    cwd: context.env.cwd,
    ...options,
  };

  return new Promise((resolve, reject) => {
    const {status, stdout, stderr} = spawnSync(command, args ?? [], resolvedOptions);

    if (status === 0) {
      resolve(stdout);
    } else {
      reject(stderr);
    }
  });
};
