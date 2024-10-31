import {type ParsedVersions, type PdkBuilderUpgradeContext} from '../upgrade.types';
import {executeCommand} from '../../../utils/executeCommand';
import {getComposerPackageVersion} from './getComposerPackageVersion';

export const upgradeComposerPackage = async (context: PdkBuilderUpgradeContext): Promise<ParsedVersions> => {
  const {args, packageName, config} = context;

  if (packageName.includes('*')) {
    throw new Error('Wildcard package names are not supported when using Composer.');
  }

  const oldVersions = await getComposerPackageVersion(context);

  if (!args.dryRun) {
    await executeCommand(context, config.composerCommand, ['require', packageName]);
  }

  return {
    oldVersions,
    newVersions: await getComposerPackageVersion(context),
  };
};
