import {COMMAND_COPY_NAME, VerbosityLevel} from '../constants';
import {
  executePromises,
  getPlatformDistPath,
  initializeCommand,
  logPlatforms,
  logSourcePath,
  logTargetPath,
  logTimeTaken,
  reportDryRun,
} from '../utils';
import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';

export const copy: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(COMMAND_COPY_NAME);

  if (args.dryRun) reportDryRun(debug, 'No files will be copied.');

  const files = glob.sync(config.source);

  debug(
    'Copying %s files from %s to %s for platforms %s',
    chalk.greenBright(files.length),
    chalk.yellow(config.source),
    logTargetPath(env, config.outDir),
    logPlatforms(config.platforms),
  );

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformDistPath = getPlatformDistPath({config, env, platform});

      debug('Copying files to %s', logTargetPath(env, platformDistPath));

      const promises = await Promise.all(
        files.map(async (file) => {
          const source = path.resolve(env.cwd, file);
          const target = path.resolve(env.cwd, platformDistPath, file);

          if (args.verbose > VerbosityLevel.VeryVeryVerbose) {
            debug('%s -> %s', logSourcePath(env, file), logTargetPath(env, [platformDistPath, file].join(path.sep)));
          }

          if (!args.dryRun) {
            await fs.promises.mkdir(path.dirname(target), {recursive: true});
            await fs.promises.copyFile(source, target);
          }
        }),
      );

      debug('Finished copying files to %s', logTargetPath(env, platformDistPath));

      return promises;
    }),
  );

  logTimeTaken(debug, time);
};
