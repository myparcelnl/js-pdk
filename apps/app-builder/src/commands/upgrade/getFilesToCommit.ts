import {type PdkBuilderUpgradeContext, UpgradeMode} from './types';

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
