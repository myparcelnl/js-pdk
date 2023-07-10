import {VerbosityLevel} from '../../constants';
import {type UpgradedEntry, type UpgradeSubContext} from './types';

export const createCommitMessage = (
  upgradedVersions: UpgradedEntry[],
  {packageName, debug, args}: UpgradeSubContext,
): string => {
  const lines: string[] = [];

  if (upgradedVersions.length === 1) {
    lines.push(`chore(deps): upgrade ${upgradedVersions[0].name} to v${upgradedVersions[0].version}`);
  } else {
    lines.push(`chore(deps): upgrade ${packageName}`);
    lines.push('');

    upgradedVersions.forEach((updatedVersion) => {
      lines.push(`- upgrade ${updatedVersion.name} to v${updatedVersion.version}`);
    });
  }

  lines.push('');
  lines.push('Compare changes:');

  upgradedVersions.forEach((updatedVersion) => {
    lines.push(`- ${updatedVersion.repository}compare/v${updatedVersion.oldVersion}..v${updatedVersion.version}`);
  });

  const commitMessage = lines.join('\n');

  if (args.verbose >= VerbosityLevel.Verbose) {
    debug('Commit message:', commitMessage);
  }

  return commitMessage;
};
