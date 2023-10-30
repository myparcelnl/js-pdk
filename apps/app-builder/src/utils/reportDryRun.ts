import {type Debugger} from 'debug';
import chalk from 'chalk';

export const reportDryRun = (debug: Debugger, string = 'No files will be modified.'): void => {
  debug(chalk.redBright(`The command was run with --dry-run. ${string}`.trim()));
};
