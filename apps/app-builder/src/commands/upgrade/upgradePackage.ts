import {type PromiseOr} from '@myparcel/ts-utils';
import {upgradeYarnPackage} from './upgradeYarnPackage';
import {upgradeComposerPackage} from './upgradeComposerPackage';
import {UpgradeMode, type UpgradeSubContextWithLockfile, type UpgradeSubResult} from './types';

export const upgradePackage = (context: UpgradeSubContextWithLockfile): PromiseOr<UpgradeSubResult> => {
  switch (context.mode) {
    case UpgradeMode.Yarn:
      return upgradeYarnPackage(context);

    case UpgradeMode.Composer:
      return upgradeComposerPackage(context);
  }

  throw new Error(`Unsupported upgrade mode: ${context.mode}`);
};
