import fs from 'fs';
import chalk from 'chalk';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {resolveString} from '../resolveString';
import {resolvePath} from '../resolvePath';
import {logTargetPath, reportDirectoryExists} from '../debug';
import {isVeryVeryVerbose} from '../command';
import {type PdkBuilderContext} from '../../types';
import {exists} from './exists';

export const mkdirs = async (paths: OneOrMore<string>, context: PdkBuilderContext): Promise<void> => {
  const {debug, args} = context;

  await Promise.all(
    toArray(paths).map(async (item) => {
      const resolvedItem = resolveString(item, context);

      if (await exists(resolvedItem)) {
        reportDirectoryExists(resolvedItem, context);
        return;
      }

      if (isVeryVeryVerbose(context)) {
        debug(chalk.greenBright(`Creating directory %s`), logTargetPath(resolvedItem, context));
      }

      if (args.dryRun) {
        return Promise.resolve();
      }

      return fs.promises.mkdir(resolvePath(item, context), {recursive: true});
    }),
  );
};
