import fs from 'fs';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logSourcePath, logTargetPath, reportFileDoesNotExist, reportFileExists} from '../debug';
import {isVeryVeryVerbose, shouldModifyFiles} from '../command';
import {type PdkBuilderContext, type StringGenerator} from '../../types';
import {exists} from './exists';

export const renameFile = async (
  source: OneOrMore<StringGenerator>,
  target: OneOrMore<StringGenerator>,
  context: PdkBuilderContext,
) => {
  const resolvedSource = resolvePath(source, context);
  const resolvedTarget = resolvePath(target, context);

  if (!(await exists(resolvedSource))) {
    reportFileDoesNotExist(resolvedSource, context);
    return;
  }

  if (await exists(resolvedTarget)) {
    reportFileExists(resolvedTarget, context);
    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug('%s -> %s', logSourcePath(resolvedSource, context), logTargetPath(resolvedTarget, context));
  }

  if (!shouldModifyFiles(context)) {
    return;
  }

  return fs.promises.rename(resolvedSource, resolvedTarget);
};
