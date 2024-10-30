import {type PdkBuilderContext} from '../../types/command';
import {type UpgradeCommandArgs, UpgradeMode} from './types';
import {getDefaultNodeLockfilePath} from './node/getDefaultNodeLockfilePath';

export const getLockfilePath = (context: PdkBuilderContext<UpgradeCommandArgs>, mode: UpgradeMode): string => {
  let lockfilePath: string | undefined = context.args.lockfile;

  switch (mode) {
    case UpgradeMode.Node:
      lockfilePath ??= getDefaultNodeLockfilePath(context);

      break;

    case UpgradeMode.Composer:
      lockfilePath ??= 'composer.lock';
      break;
  }

  if (!lockfilePath) {
    throw new Error('No lockfile path provided.');
  }

  return lockfilePath;
};
