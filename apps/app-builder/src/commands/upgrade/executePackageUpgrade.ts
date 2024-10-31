import {type ParsedVersions, type PdkBuilderUpgradeContext} from './upgrade.types';
import {upgradeNodePackage} from './node/upgradeNodePackage';
import {UpgradeMode} from './enums';
import {upgradeComposerPackage} from './composer/upgradeComposerPackage';

export const executePackageUpgrade = (context: PdkBuilderUpgradeContext): Promise<ParsedVersions> => {
  switch (context.mode) {
    case UpgradeMode.Node:
      return upgradeNodePackage(context);

    case UpgradeMode.Composer:
      return upgradeComposerPackage(context);
  }

  throw new Error(`Unsupported upgrade mode: ${context.mode}`);
};
