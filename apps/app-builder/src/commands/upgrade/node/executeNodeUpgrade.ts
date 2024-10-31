import {type PdkBuilderUpgradeContext} from '../upgrade.types';
import {NodePackageManager} from '../enums';
import {executeCommand} from '../../../utils/executeCommand';

export const executeNodeUpgrade = async (context: PdkBuilderUpgradeContext): Promise<void> => {
  const {config, packageName} = context;

  const upgradeArgs = [];

  switch (config.nodePackageManager) {
    case NodePackageManager.Bun:
      upgradeArgs.push('update', packageName);
      break;

    case NodePackageManager.Yarn:
      upgradeArgs.push('up', '-R', packageName);
      break;
  }

  await executeCommand(context, config.nodePackageManagerCommand, upgradeArgs);
};
