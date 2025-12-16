import path from 'node:path';
import fs from 'node:fs';
import {type OneOrMore} from '@myparcel-dev/ts-utils';
import {resolvePath} from '../resolvePath';
import {isDryRun} from '../command/isDryRun';
import {type PdkBuilderContext} from '../../types/command.types';
import {createDirectories} from './createDirectories';

export const copyFile = async (
  source: OneOrMore<string>,
  target: OneOrMore<string>,
  context: PdkBuilderContext,
): Promise<void> => {
  const resolvedSource = resolvePath(source, context);
  const resolvedTarget = resolvePath(target, context);

  await createDirectories(context, path.dirname(resolvedTarget));

  if (isDryRun(context)) {
    return;
  }

  await fs.promises.copyFile(resolvedSource, resolvedTarget);
};
