/* eslint-disable max-lines-per-function */
import path from 'path';
import chalk from 'chalk';
import {
  addPlatformToContext,
  executePromises,
  getPlatformDistPath,
  globFiles,
  logRelativePath,
  renameFile,
  replaceCaseSensitive,
  resolvePath,
  validateDistPath,
} from '../utils';
import {type PdkBuilderCommand} from '../types';

const STRING_TO_REPLACE = 'myparcelnl';

const rename: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      if (!(await validateDistPath(platformContext))) {
        return;
      }

      debug('Renaming files in %s', logRelativePath(platformDistPath, platformContext));

      const files = globFiles(`${platformDistPath}/**/*`, context, {
        ignore: [`${platformDistPath}/node_modules/**/*`, `${platformDistPath}/vendor/**/*`],
      });

      await Promise.all(
        files.map(async (file) => {
          const filename = path.basename(file);

          if (!filename.toLowerCase().includes(STRING_TO_REPLACE)) {
            return;
          }

          const target = resolvePath([platformDistPath, file], platformContext);

          await renameFile(
            file,
            target.replace(filename, replaceCaseSensitive(filename, STRING_TO_REPLACE, platform)),
            platformContext,
          );
        }),
      );

      debug('Finished renaming files in %s', logRelativePath(platformDistPath, platformContext));
    }),
  );
};

export default rename;
