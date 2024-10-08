import fs from 'fs';
import {executeCommand} from '../../utils/executeCommand';
import {type PdkBuilderCommand} from '../../types/command';
import {VerbosityLevel} from '../../constants';
import {verifyLockfile} from './verifyLockfile';
import {upgradePackage} from './upgradePackage';
import {type InputUpgradeCommandArgs, type UpgradedEntry, type UpgradeSubContext} from './types';
import {logVersions} from './logVersions';
import {getRepositoryUrl} from './getRepositoryUrl';
import {determineUpgradeMode} from './determineUpgradeMode';
import {createCommitMessage} from './createCommitMessage';

const upgrade: PdkBuilderCommand<InputUpgradeCommandArgs> = async ({env, args, config, debug}) => {
  const [packageName] = args.arguments ?? [];

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
    return;
  }

  logVersions(upgradedEntries, debug);

  const {dryRun, report, reportOverwrite, reportFile} = context.args;

  if (report) {
    debug('Writing report to', reportFile);

    if (!dryRun) {
      if (!reportOverwrite && fs.existsSync(reportFile) && fs.statSync(reportFile).isFile()) {
        const existingFile = fs.readFileSync(reportFile, 'utf8');
        const existingReport = JSON.parse(existingFile);

        upgradedEntries.push(...existingReport);
      }

      fs.writeFileSync(reportFile, JSON.stringify(upgradedEntries, null, 2), 'utf8');
    }
  }

  if (args.commit) {
    const commit = createCommitMessage(upgradedEntries, context);

    if (args.verbose >= VerbosityLevel.Verbose) {
      debug('Committing changes...');
    }

    if (!args.dryRun) {
      await executeCommand(context, 'git', ['add', lockfilePath], {});
      await executeCommand(context, 'git', ['commit', '-m', commit], {});
    }
  }
};

export default upgrade;
