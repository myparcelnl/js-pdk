import glob from 'fast-glob';
import chalk from 'chalk';
import {
  addPlatformToContext,
  copyFile,
  copyScopedFiles,
  executePromises,
  getPlatformDistPath,
  logPlatforms,
  logTargetPath,
  resolvePath,
  resolveStrings,
} from '../utils';
import {type PdkBuilderCommand} from '../types';

const copy: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

  const resolvedSources = resolveStrings(context, config.source);
  const files = glob.sync(resolvedSources, {cwd: env.cwd});

  debug(
    'Copying %s files from %s to %s for platforms %s',
    chalk.greenBright(files.length),
    chalk.yellow(resolvedSources),
    logTargetPath(config.outDir, context),
    logPlatforms(config.platforms),
  );

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      debug('Copying files to %s', logTargetPath(platformDistPath, platformContext));

      const promises = await Promise.all(
        files.sort().map(async (file) => {
          const source = resolvePath(file, context);
          const target = resolvePath([platformDistPath, file], context);

          await copyFile(source, target, context);
        }),
      );

      debug('Finished copying files to %s', logTargetPath(platformDistPath, platformContext));

      return promises;
    }),
  );

  await copyScopedFiles(context);
};

export default copy;
