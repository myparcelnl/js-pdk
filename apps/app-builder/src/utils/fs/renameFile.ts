import fs from 'node:fs';
import {type OneOrMore} from '@myparcel/ts-utils';
import {resolvePath} from '../resolvePath';
import {logTargetPath} from '../debug/logTargetPath';
import {logSourcePath} from '../debug/logSourcePath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {isDryRun} from '../command/isDryRun';
import {type PdkBuilderContext} from '../../types/command.types';
import {exists} from './exists';

export const renameFile = async (
  source: OneOrMore<string>,
  target: OneOrMore<string>,
  context: PdkBuilderContext,
): Promise<void> => {
  const resolvedSource = resolvePath(source, context);
  const resolvedTarget = resolvePath(target, context);

  if (!(await exists(resolvedSource))) {
    return;
  }

  if (await exists(resolvedTarget)) {
    return;
  }

  if (isVeryVeryVerbose(context)) {
    context.debug('%s -> %s', logSourcePath(resolvedSource, context), logTargetPath(resolvedTarget, context));
  }

  if (isDryRun(context)) {
    return;
  }

  return fs.promises.rename(resolvedSource, resolvedTarget);
};
