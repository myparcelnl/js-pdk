import {exists, initializeCommand, logTargetPath, logTimeTaken, reportDryRun} from '../utils';
import {PdkBuilderCommand} from '../types';
import fs from 'fs';
import path from 'path';

export const clean: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(clean.name);

  if (args.dryRun) reportDryRun(debug, 'No files will be deleted.');

  const dist = path.resolve(env.cwd, config.outDir);

  if (!(await exists(dist))) {
    debug('Folder %s does not exist, skipping...', logTargetPath(env, config.outDir));
    return;
  }

  debug('Deleting folder %s', logTargetPath(env, config.outDir));

  if (!args.dryRun) {
    await fs.promises.rm(dist, {recursive: true, force: true});
  }

  logTimeTaken(debug, time);
};
