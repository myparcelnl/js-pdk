import {type Debugger} from 'debug';
import {executeCommand} from '../../utils/executeCommand';
import {type ExecuteCommandContext} from '../../types/command';

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
