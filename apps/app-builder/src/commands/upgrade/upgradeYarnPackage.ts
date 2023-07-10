import {executeCommand} from '../../utils';
import {type UpgradeSubMethod} from './types';
import {getYarnPackageVersion} from './getYarnPackageVersion';

export const upgradeYarnPackage: UpgradeSubMethod = async (context) => {
  const {args, config, packageName} = context;

  const oldVersions = getYarnPackageVersion(context);

  if (!args.dryRun) {
    await executeCommand(context, config.yarnCommand, ['up', packageName]);
  }

  const newVersions = getYarnPackageVersion(context);

  return {
    oldVersions,
    newVersions,
  };
};
