import {type PdkBuilderUpgradeContext} from './upgrade.types';
import {UpgradeMode} from './enums';

export const getFilesToCommit = (context: PdkBuilderUpgradeContext): string[] => {
  const filesToCommit = [];

  switch (context.mode) {
    case UpgradeMode.Node:
      filesToCommit.push(context.lockfilePath, 'package.json');
      break;

    case UpgradeMode.Composer:
      filesToCommit.push(context.lockfilePath, 'composer.json');
      break;
  }

  return filesToCommit;
};
