import {spawnSync, type SpawnSyncOptions, type SpawnSyncOptionsWithStringEncoding} from 'child_process';
import {isOfType, type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {type BaseCommandContext, type PdkBuilderContext} from '../types/command.types';
import {isVeryVeryVerbose} from './command/isVeryVeryVerbose';
import {createCommand} from './command/createCommand';

export const executeCommand = async <Context extends BaseCommandContext>(
  context: Context,
  command: OneOrMore<string>,
  args?: string[],
  options?: Omit<SpawnSyncOptions, 'encoding'>,
): Promise<string> => {
  const resolvedOptions: SpawnSyncOptionsWithStringEncoding = {
    encoding: 'utf-8',
    cwd: context.env.cwd,
    stdio: isVeryVeryVerbose(context) ? 'inherit' : 'pipe',
    ...options,
  };

  return new Promise((resolve, reject) => {
    const resolvedCommand = isOfType<PdkBuilderContext>(context, 'config')
      ? toArray(createCommand(context.config, command))
      : toArray(command);

    const splitCommand = resolvedCommand.reduce((acc, command) => [...acc, ...command.split(' ')], [] as string[]);
    const allArgs = [...splitCommand, ...(args ?? [])].filter(Boolean);

    const [commandName, ...commandArgs] = allArgs;

    if (isVeryVeryVerbose(context)) {
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
