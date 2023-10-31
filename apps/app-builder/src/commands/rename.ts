/* eslint-disable max-lines-per-function */
import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {
  addPlatformToContext,
  executePromises,
  getPlatformDistPath,
  logRelativePath,
  logSourcePath,
  logTargetPath,
  replaceCaseSensitive,
  reportDryRun,
  resolvePath,
  validateDistPath,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const STRING_TO_REPLACE = 'myparcelnl';

const rename: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

  if (args.dryRun) reportDryRun(debug, 'No files will be renamed.');

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      if (!(await validateDistPath(platformContext))) {
        debug('Skipping because %s does not exist.', logRelativePath(platformDistPath, platformContext));
        return;
      }

      debug('Renaming files in %s', logRelativePath(platformDistPath, platformContext));

      const files = glob.sync(`${platformDistPath}/**/*`, {
        ignore: [`${platformDistPath}/node_modules/**/*`, `${platformDistPath}/vendor/**/*`],
        cwd: env.cwd,
      });

      await Promise.all(
        files.map(async (file) => {
          const source = resolvePath(file, platformContext);
          const target = resolvePath([platformDistPath, file], platformContext);

          const filename = path.basename(file);

          if (!filename.toLowerCase().includes(STRING_TO_REPLACE)) {
            return;
          }

          const targetFileName = replaceCaseSensitive(filename, STRING_TO_REPLACE, platform);

          if (args.verbose > VerbosityLevel.VeryVeryVerbose) {
            debug(
              '%s -> %s',
              logSourcePath(file, platformContext),
              logTargetPath([platformDistPath, file.replace(filename, targetFileName)].join(path.sep), platformContext),
            );
          }

          if (!args.dryRun) {
            await fs.promises.rename(source, target.replace(filename, targetFileName));
          }
        }),
      );

      debug('Finished renaming files in %s', logRelativePath(platformDistPath, platformContext));
    }),
  );
};

export default rename;
