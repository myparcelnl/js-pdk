import {type Debugger} from 'debug';
import chalk from 'chalk';
import {type UpgradedEntry} from './types';

export const logVersions = (versions: UpgradedEntry[], debug: Debugger): void => {
  versions.forEach(({name, oldVersion, version}) => {
    debug(`Updated ${chalk.cyanBright(name)} from ${chalk.redBright(oldVersion)} to ${chalk.greenBright(version)}`);
  });
};
