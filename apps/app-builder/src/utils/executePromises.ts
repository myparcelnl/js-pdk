import {CommandArgs} from '../types';

export async function executePromises(args: CommandArgs, promises: Promise<unknown>[]): Promise<void> {
  if (args.parallel) {
    await Promise.all(promises);

    return;
  }

  for (const promise of promises) {
    await promise;
  }
}
