import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {addPlatformToContext} from '../utils/addPlatformToContext';
import {
  executePromises,
  getPlatformDistPath,
  logPlatforms,
  logSourcePath,
  logTargetPath,
  reportDryRun,
  resolvePath,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const copy: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

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
      const platformDistPath = getPlatformDistPath(addPlatformToContext(context, platform));

      debug('Copying files to %s', logTargetPath(env, platformDistPath));

      const promises = await Promise.all(
        files.map(async (file) => {
          const source = resolvePath(file, context);
          const target = resolvePath([platformDistPath, file], context);

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
