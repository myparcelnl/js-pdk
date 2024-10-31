import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';
import {getRepositoryUrl} from './getRepositoryUrl';
import {executePackageUpgrade} from './executePackageUpgrade';

export const upgradePackages = async (context: PdkBuilderUpgradeContext): Promise<UpgradedEntry[]> => {
  const {oldVersions, newVersions} = await executePackageUpgrade(context);

  return Promise.all(
    newVersions
      .reduce((acc, entry) => {
        const oldVersion = oldVersions.find((oldVersion) => oldVersion.name === entry.name);

        if (oldVersion && oldVersion?.version !== entry.version) {
          acc.push({
            ...entry,
            oldVersion: oldVersion.version,
          });
        }

        return acc;
      }, [] as Omit<UpgradedEntry, 'repository'>[])
      .map(async (entry) => ({...entry, repository: await getRepositoryUrl(entry, context)})),
  );
};
