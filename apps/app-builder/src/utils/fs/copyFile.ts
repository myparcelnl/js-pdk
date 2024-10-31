import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug/logTargetPath';
import {logSourcePath} from '../debug/logSourcePath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {isDryRun} from '../command/isDryRun';
import {type StringGenerator} from '../../types/common.types';
import {type PdkBuilderContext} from '../../types/command.types';
import {createDirectories} from './createDirectories';

export const copyFile = async (
  source: OneOrMore<StringGenerator>,
  target: OneOrMore<StringGenerator>,
  context: PdkBuilderContext,
): Promise<void> => {
  const resolvedSource = resolvePath(source, context);
  const resolvedTarget = resolvePath(target, context);

  await createDirectories(context, path.dirname(resolvedTarget));

  if (isVeryVeryVerbose(context)) {
    context.debug(
      chalk.yellowBright('Copying %s to %s'),
      logSourcePath(resolvedSource, context),
      logTargetPath(resolvedTarget, context),
    );
  }

  if (isDryRun(context)) {
    return;
  }

  await fs.promises.copyFile(resolvedSource, resolvedTarget);
};
