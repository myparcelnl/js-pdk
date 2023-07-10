/* eslint-disable max-lines-per-function */
import {executeCommand, initializeCommand, logTimeTaken, reportDryRun} from '../../utils';
import {type PdkBuilderCommand} from '../../types';
import {COMMAND_UPGRADE_NAME, VerbosityLevel} from '../../constants';
import {verifyLockfile} from './verifyLockfile';
import {upgradePackage} from './upgradePackage';
import {type InputUpgradeCommandArgs, type UpgradedEntry, type UpgradeSubContext} from './types';
import {logVersions} from './logVersions';
import {getRepositoryUrl} from './getRepositoryUrl';
import {determineUpgradeMode} from './determineUpgradeMode';
import {createCommitMessage} from './createCommitMessage';

export const upgrade: PdkBuilderCommand<InputUpgradeCommandArgs> = async ({env, args, config}) => {
  const {debug, time} = initializeCommand(COMMAND_UPGRADE_NAME, args);

  const [packageName] = args.arguments ?? [];

  if (args.dryRun) {
    reportDryRun(debug, 'No files will be modified.');
  }

  debug('Upgrading package', packageName);

  const mode = determineUpgradeMode(packageName);
  const context = Object.freeze({args, config, debug, env, mode, packageName}) satisfies UpgradeSubContext;

  const lockfilePath = await verifyLockfile(context);

  const {oldVersions, newVersions} = await upgradePackage({
    ...context,
    lockfilePath,
  });

  const upgradedEntries: UpgradedEntry[] = await Promise.all(
    newVersions
      .reduce((acc, entry) => {
        const oldVersion = oldVersions.find((oldVersion) => oldVersion.name === entry.name);

        if (oldVersion && oldVersion?.version !== entry.version) {
          acc.push({
            ...entry,
            oldVersion: oldVersion.version,
          });
        }

        return acc;
      }, [] as Omit<UpgradedEntry, 'repository'>[])
      .map(async (entry) => ({
        ...entry,
        repository: await getRepositoryUrl(entry, context),
      })),
  );

  if (upgradedEntries.length === 0) {
    debug('No packages were updated.');
    process.exit(0);
  }

  logVersions(upgradedEntries, debug);

  if (args.commit) {
    const commit = createCommitMessage(upgradedEntries, context);

    if (args.verbose >= VerbosityLevel.Verbose) {
      debug('Committing changes...');
    }

    if (!args.dryRun) {
      await executeCommand({env}, 'git', ['add', lockfilePath], {});
      await executeCommand({env}, 'git', ['commit', '-m', commit], {});
    }
  }

  logTimeTaken(debug, time);
};
