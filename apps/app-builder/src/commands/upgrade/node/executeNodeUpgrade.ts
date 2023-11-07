import {NodePackageManager, type UpgradeSubContextWithLockfile} from '../types';
import {executeCommand} from '../../../utils';

export const executeNodeUpgrade = async (context: UpgradeSubContextWithLockfile): Promise<void> => {
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
