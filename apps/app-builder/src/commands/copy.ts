import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {executePromises, getPlatformDistPath, logPlatforms, logSourcePath, logTargetPath, reportDryRun} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const copy: PdkBuilderCommand = async ({env, config, args, debug}) => {
  if (args.dryRun) reportDryRun(debug, 'No files will be copied.');

  const files = glob.sync(config.source, {cwd: env.cwd});

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
};

export default copy;
