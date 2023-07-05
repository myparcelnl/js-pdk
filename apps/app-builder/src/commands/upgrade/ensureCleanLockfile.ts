import {type Debugger} from 'debug';
import {executeCommand, type ExecuteCommandContext} from '../../utils';

export const ensureCleanLockfile = async (
  lockfilePath: string,
  debug: Debugger,
  context: ExecuteCommandContext,
): Promise<void> => {
  const stdout = await executeCommand(context, 'git', ['status', '--porcelain', lockfilePath], {stdio: 'pipe'});

  if (stdout) {
    debug('Lockfile is already changed, please commit or stash your changes first.');
    process.exit(1);
  }
};
