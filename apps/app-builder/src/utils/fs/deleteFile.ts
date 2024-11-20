import fs from 'node:fs';
import chalk from 'chalk';
import {logSourcePath} from '../debug/logSourcePath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {isDryRun} from '../command/isDryRun';
import {type PdkBuilderContext} from '../../types/command.types';
import {exists} from './exists';

export const deleteFile = async (context: PdkBuilderContext, filePath: string): Promise<void> => {
  if (!(await exists(filePath))) {
    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting file %s'), logSourcePath(filePath, context));
  }

  if (isDryRun(context)) {
    await fs.promises.rm(filePath, {force: true});
  }
};
