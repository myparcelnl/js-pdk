import chalk from 'chalk';
import {resolveStrings} from '../utils/resolveStrings';
import {resolvePath} from '../utils/resolvePath';
import {globFiles} from '../utils/globFiles';
import {getPlatformDistPath} from '../utils/getPlatformDistPath';
import {copyFile} from '../utils/fs/copyFile';
import {executePromises} from '../utils/executePromises';
import {logTargetPath} from '../utils/debug/logTargetPath';
import {logPlatforms} from '../utils/debug/logPlatforms';
import {copyScopedFiles} from '../utils/copyScopedFiles';
import {addPlatformToContext} from '../utils/addPlatformToContext';
import {type PdkBuilderCommand} from '../types/command';

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
