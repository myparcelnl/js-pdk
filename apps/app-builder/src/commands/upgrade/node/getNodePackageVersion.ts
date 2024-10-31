import {type ParsedEntry, type PdkBuilderUpgradeContext} from '../upgrade.types';
import {NodePackageManager} from '../enums';
import {getPackageEntriesForYarn} from './getPackageEntriesForYarn';
import {getPackageEntriesForBun} from './getPackageEntriesForBun';

export const getNodePackageVersion = async (context: PdkBuilderUpgradeContext): Promise<ParsedEntry[]> => {
  const {lockfilePath, packageName, config} = context;

  const matches: ParsedEntry[] = [];

  const resolvedPackageName = packageName.replace(/\*/g, '.*').replace(/\//g, '\\/');

  switch (config.nodePackageManager) {
    case NodePackageManager.Yarn:
      matches.push(...(await getPackageEntriesForYarn(context, resolvedPackageName)));

      break;

    case NodePackageManager.Bun:
      matches.push(...(await getPackageEntriesForBun(context, resolvedPackageName)));

      break;
  }

  if (matches.length === 0) {
    throw new Error(`Package ${packageName} not found in lockfile ${lockfilePath}`);
  }

  return matches;
};
