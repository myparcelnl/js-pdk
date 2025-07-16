import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug/logTargetPath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {isDryRun} from '../command/isDryRun';
import {type PdkBuilderContext} from '../../types/command.types';
import {createDirectories} from './createDirectories';

export const writeFile = async (
  context: PdkBuilderContext,
  filePath: OneOrMore<string>,
  contents: string,
): Promise<void> => {
  const resolvedPath = resolvePath(filePath, context);

  await createDirectories(context, path.dirname(resolvedPath));

  if (isVeryVeryVerbose(context)) {
    context.debug(chalk.yellowBright('Writing file %s'), logTargetPath(resolvedPath, context));
  }

  if (isDryRun(context)) {
    return;
  }

  await fs.promises.writeFile(resolvedPath, contents);
};
