import fs from 'fs';
import chalk from 'chalk';
import {resolvePath} from '../resolvePath';
import {reportDirectoryDoesNotExist} from '../debug/reportOnFile';
import {logSourcePath} from '../debug/logSourcePath';
import {shouldModifyFiles} from '../command/shouldModifyFiles';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {type PdkBuilderContext} from '../../types/command';
import {exists} from './exists';

export const rmDir = async (dirPath: string, context: PdkBuilderContext): Promise<void> => {
  const resolvedPath = resolvePath(dirPath, context);

  if (!(await exists(resolvedPath))) {
    reportDirectoryDoesNotExist(resolvedPath, context);
    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting folder %s'), logSourcePath(dirPath, context));
  }

  if (shouldModifyFiles(context)) {
    await fs.promises.rm(resolvedPath, {recursive: true, force: true});
  }
};
