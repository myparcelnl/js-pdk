import fs from 'fs';
import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './types';

export const writeReport = (context: PdkBuilderUpgradeContext, upgradedEntries: UpgradedEntry[]): void => {
  const {dryRun, reportOverwrite, reportFile} = context.args;
  const {debug} = context;

  debug('Writing report to', reportFile);

  if (dryRun) {
    return;
  }

  if (!reportOverwrite && fs.existsSync(reportFile) && fs.statSync(reportFile).isFile()) {
    const existingFile = fs.readFileSync(reportFile, 'utf8');
    const existingReport = JSON.parse(existingFile);

    upgradedEntries.push(...existingReport);
  }

  fs.writeFileSync(reportFile, JSON.stringify(upgradedEntries, null, 2), 'utf8');
};
