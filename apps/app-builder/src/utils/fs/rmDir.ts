import fs from 'fs';
import chalk from 'chalk';
import {resolvePath} from '../resolvePath';
import {logSourcePath, reportDirectoryDoesNotExist} from '../debug';
import {isVeryVerbose, shouldModifyFiles} from '../command';
import {type PdkBuilderContext} from '../../types';
import {exists} from './exists';

export const rmDir = async (dirPath: string, context: PdkBuilderContext): Promise<void> => {
  const resolvedPath = resolvePath(dirPath, context);

  if (!(await exists(resolvedPath))) {
    reportDirectoryDoesNotExist(resolvedPath, context);
    return;
  }

  if (isVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting folder %s'), logSourcePath(dirPath, context));
  }

  if (shouldModifyFiles(context)) {
    await fs.promises.rm(resolvedPath, {recursive: true, force: true});
  }
};
