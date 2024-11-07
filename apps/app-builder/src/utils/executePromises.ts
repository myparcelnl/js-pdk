import {type DefaultCommandArgs} from '../types/command.types';

export const executePromises = async (args: DefaultCommandArgs, promises: Promise<unknown>[]): Promise<void> => {
  if (args.parallel) {
    await Promise.all(promises);

    return;
  }

  for (const promise of promises) {
    await promise;
  }
};
