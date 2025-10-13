import fs from 'node:fs';
import chalk from 'chalk';
import {resolveString} from '../resolveString';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug/logTargetPath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {isDryRun} from '../command/isDryRun';
import {type PdkBuilderContext} from '../../types/command.types';
import {exists} from './exists';

export const createDirectory = async (context: PdkBuilderContext, item: string): Promise<void> => {
  const {debug} = context;
  const resolvedPath = resolveString(item, context);

  if (await exists(resolvedPath)) {
    return;
  }

  if (isVeryVeryVerbose(context)) {
    debug(chalk.greenBright(`Creating directory %s`), logTargetPath(resolvedPath, context));
  }

  if (isDryRun(context)) {
    return Promise.resolve();
  }

  await fs.promises.mkdir(resolvePath(item, context), {recursive: true});
};
