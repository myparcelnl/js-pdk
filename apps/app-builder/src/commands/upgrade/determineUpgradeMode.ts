import {UpgradeMode} from './types';

export const determineUpgradeMode = (packageName: string): UpgradeMode => {
  const isComposerPackage = /^\w+\/\w+$/.exec(packageName);

  return isComposerPackage ? UpgradeMode.Composer : UpgradeMode.Yarn;
};
