/* eslint-disable max-lines-per-function */
import chalk from 'chalk';
import {
  addPlatformToContext,
  executePromises,
  getFileContents,
  getOccurrences,
  globFiles,
  isVeryVeryVerbose,
  logPlatforms,
  logSourcePath,
  logTargetPath,
  replaceCaseSensitive,
  resolvePath,
  validateDistPath,
  writeFile,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {PdkPlatformName} from '../constants';

const SOURCE_PLATFORM = PdkPlatformName.MyParcelNl;

const transform: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

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

      if (!(await validateDistPath(platformContext))) {
        return;
      }

      const platformFolderPath = resolvePath([config.outDir, config.platformFolderName], platformContext);

      debug('Transforming files in %s', logSourcePath(platformFolderPath, platformContext));

      const files = globFiles(`${platformFolderPath}/**/*`, context, {
        ignore: [
          `${platformFolderPath}/node_modules/**/*`,
          `${platformFolderPath}/package.json`,
          `${platformFolderPath}/yarn.lock`,
          `${platformFolderPath}/**/*.log`,
          `${platformFolderPath}/**/*.map`,
          `${platformFolderPath}/**/*.d.ts`,
        ],
      });

      const promises = await Promise.all(
        files.map(async (file) => {
          const sourcePath = resolvePath(file, platformContext);
          const contents = await getFileContents(sourcePath);

          const occurrences = getOccurrences(contents, SOURCE_PLATFORM);

          if (occurrences.length > 0) {
            if (isVeryVeryVerbose(context)) {
              debug(
                'Replacing %s occurrences of "%s" with "%s" in %s',
                chalk.greenBright(occurrences.length),
                chalk.red(SOURCE_PLATFORM),
                chalk.green(platform),
                logTargetPath(file, platformContext),
              );
            }

            const newContents = replaceCaseSensitive(contents, SOURCE_PLATFORM, platform);

            await writeFile(sourcePath, newContents, platformContext);
          }
        }),
      );

      debug('Finished transforming files in %s', logSourcePath(platformFolderPath, platformContext));

      return promises;
    }),
  );
};

export default transform;
