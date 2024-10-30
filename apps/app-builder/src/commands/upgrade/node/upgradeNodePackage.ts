import {type UpgradeSubMethod} from '../types';
import {getNodePackageVersion} from './getNodePackageVersion';
import {executeNodeUpgrade} from './executeNodeUpgrade';

export const upgradeNodePackage = (async (context) => {
  const {args} = context;

  const oldVersions = await getNodePackageVersion(context);

  if (!args.dryRun) {
    await executeNodeUpgrade(context);
  }

  const newVersions = await getNodePackageVersion(context);

  return {
    oldVersions,
    newVersions,
  };
}) satisfies UpgradeSubMethod;
