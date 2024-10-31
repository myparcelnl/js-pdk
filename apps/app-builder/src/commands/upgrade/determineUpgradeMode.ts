import {UpgradeMode} from './enums';

export const determineUpgradeMode = (packageName: string): UpgradeMode => {
  const isComposerPackage = /^\w+\/\w+$/.exec(packageName);

  return isComposerPackage ? UpgradeMode.Composer : UpgradeMode.Node;
};
