import {VerbosityLevel} from '../../constants';
import {type UpgradedEntry, type UpgradeSubContext} from './types';
import {getCommitType} from './getCommitType';

export const createCommitMessage = (upgradedVersions: UpgradedEntry[], context: UpgradeSubContext): string => {
  const {packageName, debug, args} = context;

  const lines: string[] = [];
  const commitType = getCommitType(context, upgradedVersions);

  if (upgradedVersions.length === 1) {
    lines.push(`${commitType}(deps): upgrade ${upgradedVersions[0].name} to v${upgradedVersions[0].version}`);
  } else {
    lines.push(`${commitType}(deps): upgrade ${packageName}`);
    lines.push('');

    upgradedVersions.forEach((updatedVersion) => {
      lines.push(`- upgrade ${updatedVersion.name} to v${updatedVersion.version}`);
    });
  }

  const versionsWithRepository = upgradedVersions.filter((updatedVersion) => updatedVersion.repository);

  if (versionsWithRepository.length) {
    lines.push('');
    lines.push('Compare changes:');

    versionsWithRepository.forEach((updatedVersion) => {
      lines.push(`- ${updatedVersion.repository}compare/v${updatedVersion.oldVersion}...v${updatedVersion.version}`);
    });
  }

  const commitMessage = lines.join('\n');

  if (args.verbose >= VerbosityLevel.Verbose) {
    debug('Commit message:', commitMessage);
  }

  return commitMessage;
};
