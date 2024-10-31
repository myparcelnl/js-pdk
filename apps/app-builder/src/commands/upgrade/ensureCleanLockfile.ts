import {executeCommand} from '../../utils/executeCommand';
import {type PdkBuilderUpgradeContext} from './upgrade.types';

export const ensureCleanLockfile = async (context: PdkBuilderUpgradeContext): Promise<void> => {
  const stdout = await executeCommand(context, 'git', ['status', '--porcelain', context.lockfilePath], {stdio: 'pipe'});

  if (stdout) {
    throw new Error('Lockfile is already changed, please commit or stash your changes first.');
  }
};
