import {type Debugger} from 'debug';
import chalk from 'chalk';

export function logTimeTaken(debug: Debugger, startTime: number): void {
  debug(chalk.greenBright('Done in'), chalk.yellowBright(`${Date.now() - startTime}ms`));
}
