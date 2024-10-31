import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';
import {getCommitType} from './getCommitType';

export const createCommitMessage = (context: PdkBuilderUpgradeContext, entries: UpgradedEntry[]): string => {
  const {packageName} = context;

  const lines: string[] = [];
  const commitType = getCommitType(context, entries);

  if (entries.length === 1) {
    const {name, version} = entries[0];

    lines.push(`${commitType}(deps): upgrade ${name} to v${version}`);
  } else {
    lines.push(`${commitType}(deps): upgrade ${packageName}`);
    lines.push('');

    entries.forEach((entry) => {
      lines.push(`- upgrade ${entry.name} to v${entry.version}`);
    });
  }

  const entriesWithRepository = entries.filter((updatedVersion) => updatedVersion.repository);

  if (entriesWithRepository.length) {
    lines.push('');
    lines.push('Compare changes:');

    entriesWithRepository.forEach(({oldVersion, repository, version}) => {
      lines.push(`- ${repository}/compare/v${oldVersion}...v${version}`.replace(/^https?:\/\/[^/]+/, '/'));
    });
  }

  return lines.join('\n');
};
