import fs from 'node:fs';
import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';

export const writeReport = (context: PdkBuilderUpgradeContext, upgradedEntries: UpgradedEntry[]): void => {
  const {config, debug, args} = context;
  const {dryRun, reportOverwrite, reportFile} = args;

  debug('Writing report to', reportFile);

  if (dryRun) {
    return;
  }

  if (!reportOverwrite && fs.existsSync(reportFile) && fs.statSync(reportFile).isFile()) {
    const existingFile = fs.readFileSync(reportFile, 'utf8');
    const existingReport = JSON.parse(existingFile);

    upgradedEntries.push(...existingReport);
  }

  fs.writeFileSync(reportFile, JSON.stringify(upgradedEntries, null, config.jsonSpaces), 'utf8');
};
