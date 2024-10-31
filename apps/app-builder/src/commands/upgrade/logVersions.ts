import chalk from 'chalk';
import {type PdkBuilderUpgradeContext, type UpgradedEntry} from './upgrade.types';

export const logVersions = (context: PdkBuilderUpgradeContext, entries: UpgradedEntry[]): void => {
  entries.forEach(({name, oldVersion, version}) => {
    context.debug(
      `Updated ${chalk.cyanBright(name)} from ${chalk.redBright(oldVersion)} to ${chalk.greenBright(version)}`,
    );
  });
};
