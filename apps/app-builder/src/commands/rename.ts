import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import {createDebugger} from '../utils/createDebugger';
import {reportDryRun} from '../utils/reportDryRun';

export const rename: PdkBuilderCommand = async ({env, config, args}) => {
  const debug = createDebugger('rename');

  if (args.dryRun) reportDryRun(debug, 'No files will be renamed.');

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  debug(chalk.red('(Not actually doing anything, this is not implemented yet.)'));

  debug('Done');
};
