import {executeCommand} from '../../utils/executeCommand';
import {VerbosityLevel} from '../../constants';
import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';
import {getFilesToCommit} from './getFilesToCommit';
import {createCommitMessage} from './createCommitMessage';

export const commitChanges = async (
  context: PdkBuilderUpgradeContext,
  upgradedEntries: UpgradedEntry[],
): Promise<void> => {
  const {dryRun, verbose} = context.args;
  const {debug} = context;

  const filesToCommit = getFilesToCommit(context);
  const commitMessage = createCommitMessage(context, upgradedEntries);

  if (verbose >= VerbosityLevel.Verbose) {
    debug('Commit message:', commitMessage);
    debug(`Commit file(s): ${filesToCommit.join(', ')}`);
  }

  if (dryRun) {
    return;
  }

  await executeCommand(context, 'git', ['add', ...filesToCommit], {});
  await executeCommand(context, 'git', ['commit', '-m', commitMessage], {});
};
