import fs from 'fs';
import {exists, logTargetPath, reportDryRun, resolvePath} from '../utils';
import {type PdkBuilderCommand} from '../types';

const clean: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;

  if (args.dryRun) reportDryRun(debug);

  const dist = resolvePath(config.outDir, context);

  if (!(await exists(dist))) {
    debug('Folder %s does not exist, skipping...', logTargetPath(config.outDir, context));
    return;
  }

  debug('Deleting folder %s', logTargetPath(config.outDir, context));

  if (!args.dryRun) {
    await fs.promises.rm(dist, {recursive: true, force: true});
  }
};

export default clean;
