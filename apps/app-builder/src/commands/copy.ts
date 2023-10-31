import chalk from 'chalk';
import {
  addPlatformToContext,
  copyFile,
  copyScopedFiles,
  executePromises,
  getPlatformDistPath,
  globFiles,
  logPlatforms,
  logTargetPath,
  resolvePath,
  resolveStrings,
} from '../utils';
import {type PdkBuilderCommand} from '../types';

const copy: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;

  const files = globFiles(config.source, context);

  debug(
    'Copying %s files from %s to %s for platforms %s',
    chalk.greenBright(files.length),
    chalk.yellow(resolveStrings(context, config.source)),
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
