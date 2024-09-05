import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug/logTargetPath';
import {shouldModifyFiles} from '../command/shouldModifyFiles';
import {isVeryVerbose} from '../command/isVeryVerbose';
import {type StringGenerator} from '../../types/common';
import {type PdkBuilderContext} from '../../types/command';
import {mkdirs} from './mkdirs';

export const writeFile = async (
  filePath: OneOrMore<StringGenerator>,
  contents: string,
  context: PdkBuilderContext,
): Promise<void> => {
  const resolvedPath = resolvePath(filePath, context);

  await mkdirs(path.dirname(resolvedPath), context);

  if (isVeryVerbose(context)) {
    context.debug(chalk.yellowBright('Writing file %s'), logTargetPath(resolvedPath, context));
  }

  if (!shouldModifyFiles(context)) {
    return;
  }

  await fs.promises.writeFile(resolvedPath, contents);
};
