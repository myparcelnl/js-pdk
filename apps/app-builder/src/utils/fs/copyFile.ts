import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logSourcePath, logTargetPath} from '../debug';
import {isVeryVerbose, shouldModifyFiles} from '../command';
import {type PdkBuilderContext, type StringGenerator} from '../../types';
import {mkdirs} from './mkdirs';

export const copyFile = async (
  source: OneOrMore<StringGenerator>,
  target: OneOrMore<StringGenerator>,
  context: PdkBuilderContext,
): Promise<void> => {
  const resolvedSource = resolvePath(source, context);
  const resolvedTarget = resolvePath(target, context);

  await mkdirs(path.dirname(resolvedTarget), context);

  if (isVeryVerbose(context)) {
    context.debug(
      chalk.yellowBright('Copying %s to %s'),
      logSourcePath(resolvedSource, context),
      logTargetPath(resolvedTarget, context),
    );
  }

  if (!shouldModifyFiles(context)) {
    return;
  }

  await fs.promises.copyFile(resolvedSource, resolvedTarget);
};
