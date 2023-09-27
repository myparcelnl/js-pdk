import {type PromiseOr} from '@myparcel/ts-utils';
import {UpgradeMode, type UpgradeSubContextWithLockfile, type UpgradeSubResult} from './types';
import {upgradeNodePackage} from './node';
import {upgradeComposerPackage} from './composer';

export const upgradePackage = (context: UpgradeSubContextWithLockfile): PromiseOr<UpgradeSubResult> => {
  switch (context.mode) {
    case UpgradeMode.Node:
      return upgradeNodePackage(context);

    case UpgradeMode.Composer:
      return upgradeComposerPackage(context);
  }

  throw new Error(`Unsupported upgrade mode: ${context.mode}`);
};
