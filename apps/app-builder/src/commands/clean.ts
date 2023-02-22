import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import {createDebugger} from '../utils/createDebugger';
import {exists} from '../utils/exists';
import fs from 'fs';
import path from 'path';
import {reportDryRun} from '../utils/reportDryRun';

export const clean: PdkBuilderCommand = async ({env, config, args}) => {
  const debug = createDebugger('clean');

  if (args.dryRun) reportDryRun(debug, 'No files will be deleted.');

  const dist = path.resolve(env.cwd, config.outDir);

  const relativePath = path.relative(env.cwd, config.outDir);

  if (!(await exists(dist))) {
    debug('Dist folder %s does not exist, skipping...', chalk.greenBright(relativePath));
    return;
  }

  debug('Deleting %s folder', chalk.cyan(path.relative(env.cwd, config.outDir)));

  if (!args.dryRun) {
    await fs.promises.rm(dist, {recursive: true, force: true});
  }

  debug('Done');
};
