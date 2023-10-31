import path from 'path';
import fs from 'fs';
import {logTargetPath} from '../logTargetPath';
import {logSourcePath} from '../logSourcePath';
import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';
import {mkdirs} from './mkdirs';

export const copyFile = async (source: string, target: string, context: PdkBuilderContext): Promise<void> => {
  await mkdirs(path.dirname(target), context);

  if (context.args.verbose >= VerbosityLevel.Verbose) {
    context.debug('%s -> %s', logSourcePath(source, context), logTargetPath(target, context));
  }

  if (context.args.dryRun) {
    return;
  }

  await fs.promises.copyFile(source, target);
};
