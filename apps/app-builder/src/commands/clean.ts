import path from 'path';
import fs from 'fs';
import {exists, logTargetPath, reportDryRun} from '../utils';
import {type PdkBuilderCommand} from '../types';

const clean: PdkBuilderCommand = async ({env, config, args, debug}) => {
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
};

export default clean;
