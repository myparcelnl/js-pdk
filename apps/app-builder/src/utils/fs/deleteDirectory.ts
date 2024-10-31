import fs from 'node:fs';
import chalk from 'chalk';
import {resolvePath} from '../resolvePath';
import {reportDirectoryDoesNotExist} from '../debug/reportOnFile';
import {logSourcePath} from '../debug/logSourcePath';
import {shouldModifyFiles} from '../command/shouldModifyFiles';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {type PdkBuilderContext} from '../../types/command.types';
import {exists} from './exists';

export const deleteDirectory = async (context: PdkBuilderContext, directoryPath: string): Promise<void> => {
  const resolvedPath = resolvePath(directoryPath, context);

  if (!(await exists(resolvedPath))) {
    reportDirectoryDoesNotExist(resolvedPath, context);
    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug(chalk.redBright('Deleting folder %s'), logSourcePath(directoryPath, context));
  }

  if (shouldModifyFiles(context)) {
    await fs.promises.rm(resolvedPath, {recursive: true, force: true});
  }
};
