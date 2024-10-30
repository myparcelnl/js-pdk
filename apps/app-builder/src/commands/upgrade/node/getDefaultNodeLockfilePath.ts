import {NodePackageManager} from '../types';
import {type PdkBuilderContext} from '../../../types/command';

export const getDefaultNodeLockfilePath = (context: PdkBuilderContext): string => {
  switch (context.config.nodePackageManager) {
    case NodePackageManager.Yarn:
      return 'yarn.lock';

    case NodePackageManager.Bun:
      return 'bun.lockb';
  }
};
