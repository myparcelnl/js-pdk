/* eslint-disable max-lines-per-function */
import {
  executePromises,
  getPlatformDistPath,
  initializeCommand,
  logRelativePath,
  logSourcePath,
  logTargetPath,
  logTimeTaken,
  reportDryRun,
  validateDistPath,
} from '../utils';
import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';
import {replaceCaseSensitive} from '../utils/transformer';

const STRING_TO_REPLACE = 'myparcelnl';

export const rename: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(rename.name);

  if (args.dryRun) reportDryRun(debug, 'No files will be renamed.');

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformDistPath = getPlatformDistPath({config, env, platform});

      if (!(await validateDistPath({config, env, platform, args}))) {
        debug('Skipping because %s does not exist.', logRelativePath(env, platformDistPath));
        return;
      }

      debug('Renaming files in %s', logRelativePath(env, platformDistPath));

      const files = glob.sync(`${platformDistPath}/**/*`, {
        ignore: [`${platformDistPath}/node_modules/**/*`, `${platformDistPath}/vendor/**/*`],
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

          if (args.verbose >= 3) {
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

  logTimeTaken(debug, time);
};
