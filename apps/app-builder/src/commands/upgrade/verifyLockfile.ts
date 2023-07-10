import {UpgradeMode, type UpgradeSubContext} from './types';
import {ensureCleanLockfile} from './ensureCleanLockfile';

export const verifyLockfile = async (context: UpgradeSubContext): Promise<string> => {
  const {args, debug, mode} = context;

  let lockfilePath: string | undefined = args.lockfile;

  switch (mode) {
    case UpgradeMode.Yarn:
      lockfilePath ??= 'yarn.lock';
      break;

    case UpgradeMode.Composer:
      lockfilePath ??= 'composer.lock';
      break;
  }

  if (!lockfilePath) {
    debug('No lockfile path provided.');
    process.exit(1);
  }

  if (args.check) {
    await ensureCleanLockfile(lockfilePath, debug, context);
  }

  return lockfilePath;
};
