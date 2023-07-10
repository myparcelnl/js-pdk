import {executeCommand} from '../../utils';
import {type UpgradeSubMethod} from './types';
import {getComposerPackageVersion} from './getComposerPackageVersion';

export const upgradeComposerPackage: UpgradeSubMethod = async (context) => {
  const {args, packageName, config} = context;

  if (packageName.includes('*')) {
    throw new Error('Wildcard package names are not supported when using Composer.');
  }

  const oldVersions = await getComposerPackageVersion(context);

  if (!args.dryRun) {
    await executeCommand(context, config.composerCommand, ['update', packageName]);
  }

  return {
    oldVersions,
    newVersions: await getComposerPackageVersion(context),
  };
};
