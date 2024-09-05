import diff from 'semver/functions/diff.js';
import {type PdkBuilderContext} from '../../types/command';
import {COMMIT_TYPE_AUTO} from '../../constants';
import {type UpgradedEntry} from './types';

export const getCommitType = (context: PdkBuilderContext, upgradedVersions: UpgradedEntry[]): string => {
  if (context.config.commitType === COMMIT_TYPE_AUTO) {
    const isPatchUpgrade = upgradedVersions.every((updatedVersion) => {
      if (!updatedVersion.oldVersion) {
        return false;
      }

      const difference = diff(updatedVersion.oldVersion, updatedVersion.version);

      return difference === 'patch';
    });

    return isPatchUpgrade ? 'fix' : 'feat';
  }

  return context.config.commitType;
};
