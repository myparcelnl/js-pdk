import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug';
import {isVeryVerbose, shouldModifyFiles} from '../command';
import {type PdkBuilderContext, type StringGenerator} from '../../types';
import {mkdirs} from './mkdirs';

export const writeFile = async (filePath: OneOrMore<StringGenerator>, contents: string, context: PdkBuilderContext) => {
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
