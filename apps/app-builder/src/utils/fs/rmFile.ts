import fs from 'fs';
import chalk from 'chalk';
import {reportFileDoesNotExist} from '../debug/reportOnFile';
import {logSourcePath} from '../debug/logSourcePath';
import {shouldModifyFiles} from '../command/shouldModifyFiles';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {type PdkBuilderContext} from '../../types/command';
import {exists} from './exists';

export const rmFile = async (filePath: string, context: PdkBuilderContext) => {
  if (!(await exists(filePath))) {
    reportFileDoesNotExist(filePath, context);

    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting file %s'), logSourcePath(filePath, context));
  }

  if (!shouldModifyFiles(context)) {
    await fs.promises.rm(filePath, {force: true});
  }
};
