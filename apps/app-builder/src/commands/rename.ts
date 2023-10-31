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
        debug('Skipping because %s does not exist.', logRelativePath(env, platformDistPath));
        return;
      }

      debug('Renaming files in %s', logRelativePath(env, platformDistPath));

      const files = glob.sync(`${platformDistPath}/**/*`, {
        ignore: [`${platformDistPath}/node_modules/**/*`, `${platformDistPath}/vendor/**/*`],
        cwd: env.cwd,
      });

      await Promise.all(
        files.map(async (file) => {
          const source = path.resolve(env.cwd, file);
          const target = path.resolve(env.cwd, platformDistPath, file);

          const filename = path.basename(file);

          if (!filename.toLowerCase().includes(STRING_TO_REPLACE)) {
            return;
          }

          const targetFileName = replaceCaseSensitive(filename, STRING_TO_REPLACE, platform);

          if (args.verbose > VerbosityLevel.VeryVeryVerbose) {
            debug(
              '%s -> %s',
              logSourcePath(env, file),
              logTargetPath(env, [platformDistPath, file.replace(filename, targetFileName)].join(path.sep)),
            );
          }

          if (!args.dryRun) {
            await fs.promises.rename(source, target.replace(filename, targetFileName));
          }
        }),
      );

      debug('Finished renaming files in %s', logRelativePath(env, platformDistPath));
    }),
  );
};

export default rename;
