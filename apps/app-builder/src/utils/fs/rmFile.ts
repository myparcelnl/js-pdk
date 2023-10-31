import fs from 'fs';
import chalk from 'chalk';
import {logSourcePath, reportFileDoesNotExist} from '../debug';
import {isVeryVerbose, shouldModifyFiles} from '../command';
import {type PdkBuilderContext} from '../../types';
import {exists} from './exists';

export const rmFile = async (filePath: string, context: PdkBuilderContext) => {
  if (!(await exists(filePath))) {
    reportFileDoesNotExist(filePath, context);

    return;
  }

  if (isVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting file %s'), logSourcePath(filePath, context));
  }

  if (!shouldModifyFiles(context)) {
    await fs.promises.rm(filePath, {force: true});
  }
};
