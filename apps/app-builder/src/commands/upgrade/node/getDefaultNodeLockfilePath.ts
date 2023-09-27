import {NodePackageManager, type UpgradeSubContext} from '../types';

export const getDefaultNodeLockfilePath = (context: UpgradeSubContext): string => {
  switch (context.config.nodePackageManager) {
    case NodePackageManager.Yarn:
      return 'yarn.lock';

    case NodePackageManager.Bun:
      return 'bun.lockb';
  }
};
