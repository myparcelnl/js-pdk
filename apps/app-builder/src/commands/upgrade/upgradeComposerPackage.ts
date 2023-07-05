import {type UpgradeSubMethod} from './types';

export const upgradeComposerPackage: UpgradeSubMethod = () => {
  throw new Error('Composer packages are not supported yet.');
};
