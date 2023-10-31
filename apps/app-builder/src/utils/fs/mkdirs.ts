import fs from 'fs';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {resolveString} from '../resolveString';
import {resolvePath} from '../resolvePath';
import {exists} from '../exists';
import {type PdkBuilderContext} from '../../types';
import {VerbosityLevel} from '../../constants';

export const mkdirs = async (paths: OneOrMore<string>, context: PdkBuilderContext): Promise<void> => {
  const {debug, args} = context;

  await Promise.all(
    toArray(paths).map(async (item) => {
      const resolvedItem = resolveString(item, context);

      if (await exists(resolvedItem)) {
        if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
          debug(`Directory ${resolvedItem} already exists`);
        }

        return;
      }

      if (args.verbose >= VerbosityLevel.VeryVerbose) {
        debug(`Creating directory ${resolvedItem}`);
      }

      if (args.dryRun) {
        return Promise.resolve();
      }

      return fs.promises.mkdir(resolvePath(item, context), {recursive: true});
    }),
  );
};
