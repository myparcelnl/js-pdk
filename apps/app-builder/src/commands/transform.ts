/* eslint-disable max-lines-per-function */
import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {
  addPlatformToContext,
  executePromises,
  getOccurrences,
  getPlatformDistPath,
  logPlatforms,
  logRelativePath,
  logTargetPath,
  replaceCaseSensitive,
  reportDryRun,
  resolveString,
  validateDistPath,
} from '../utils';
import {type PdkBuilderCommand, PdkPlatformName} from '../types';
import {VerbosityLevel} from '../constants';

const SOURCE_PLATFORM = PdkPlatformName.MyParcelNl;

const transform: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

  if (args.dryRun) {
    reportDryRun(debug, 'No files will be transformed.');
  }

  const filteredPlatforms = config.platforms.filter((platform) => platform !== SOURCE_PLATFORM);

  if (!filteredPlatforms.length) {
    debug('No platforms to transform, skipping...');
    return;
  }

  debug('Transforming files for platforms %s', logPlatforms(filteredPlatforms));

  await executePromises(
    args,
    filteredPlatforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformFolderPath = `${config.outDir}/${resolveString(config.platformFolderName, platformContext)}`;
      const relativeDistFolderPath = path.relative(env.cwd, platformFolderPath);

      debug('Renaming files in %s', chalk.greenBright(relativeDistFolderPath));

      const files = glob.sync(`${platformFolderPath}/**/*`, {
        ignore: [
          `${platformFolderPath}/node_modules/**/*`,
          `${platformFolderPath}/package.json`,
          `${platformFolderPath}/yarn.lock`,
          `${platformFolderPath}/**/*.log`,
          `${platformFolderPath}/**/*.map`,
          `${platformFolderPath}/**/*.d.ts`,
        ],
      });

      const platformDistPath = getPlatformDistPath(platformContext);

      const promises = await Promise.all(
        files.map(async (file) => {
          if (!(await validateDistPath(platformContext))) {
            debug('Skipping because %s does not exist.', logRelativePath(env, platformDistPath));
            return;
          }

          const source = path.resolve(env.cwd, file);

          const contents = (await fs.promises.readFile(source)).toString('utf-8');

          const occurrences = getOccurrences(contents, SOURCE_PLATFORM);

          if (occurrences.length > 0) {
            if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
              debug(
                'Replacing %s occurrences of "%s" with "%s" in %s',
                chalk.greenBright(occurrences.length),
                chalk.red(SOURCE_PLATFORM),
                chalk.green(platform),
                logTargetPath(env, file),
              );
            }

            if (!args.dryRun) {
              const newContents = replaceCaseSensitive(contents, SOURCE_PLATFORM, platform);

              await fs.promises.writeFile(source, newContents);
            }
          }
        }),
      );

      debug('Finished transforming files in %s', chalk.greenBright(relativeDistFolderPath));

      return promises;
    }),
  );
};

export default transform;
