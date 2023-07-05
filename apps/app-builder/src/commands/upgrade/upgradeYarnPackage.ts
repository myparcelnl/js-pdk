import {executeCommand} from '../../utils';
import {type UpgradeSubMethod} from './types';
import {getYarnPackageVersion} from './getYarnPackageVersion';

export const upgradeYarnPackage: UpgradeSubMethod = async ({args, env, packageName, lockfilePath}) => {
  const oldVersions = getYarnPackageVersion(packageName, lockfilePath);

  if (!args.dryRun) {
    await executeCommand({env}, 'yarn', ['up', packageName]);
  }

  const newVersions = getYarnPackageVersion(packageName, lockfilePath);

  return {
    lockfilePath,
    oldVersions,
    newVersions,
  };
};
