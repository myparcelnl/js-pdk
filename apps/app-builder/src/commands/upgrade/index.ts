import {type PdkBuilderCommand} from '../../types/command';
import {writeReport} from './writeReport';
import {upgradePackages} from './upgradePackages';
import {type InputUpgradeCommandArgs, type PdkBuilderUpgradeContext} from './types';
import {logVersions} from './logVersions';
import {getLockfilePath} from './getLockfilePath';
import {ensureCleanLockfile} from './ensureCleanLockfile';
import {determineUpgradeMode} from './determineUpgradeMode';
import {commitChanges} from './commitChanges';

const upgrade: PdkBuilderCommand<InputUpgradeCommandArgs> = async (inputContext) => {
  const {args, debug} = inputContext;
  const [packageName] = args.arguments ?? [];

  debug('Upgrading package', packageName);

  const mode = determineUpgradeMode(packageName);
  const context = Object.freeze({
    ...inputContext,
    mode,
    packageName,
    lockfilePath: getLockfilePath(inputContext, mode),
  }) satisfies PdkBuilderUpgradeContext;

  if (args.check) {
    await ensureCleanLockfile(context);
  }

  const upgradedEntries = await upgradePackages(context);

  if (upgradedEntries.length === 0) {
    debug('No packages were updated.');
    return;
  }

  logVersions(context, upgradedEntries);

  if (args.report) {
    writeReport(context, upgradedEntries);
  }

  if (args.commit) {
    await commitChanges(context, upgradedEntries);
  }
};

export default upgrade;
