import fs from 'fs';
import chalk from 'chalk';
import {addPlatformToContext} from '../utils/addPlatformToContext';
import {
  createArchive,
  executePromises,
  exists,
  getPlatformDistPath,
  logSourcePath,
  logTargetPath,
  reportDryRun,
  resolvePath,
  resolveString,
  validateDistPath,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {VerbosityLevel} from '../constants';

const zip: PdkBuilderCommand = async (context) => {
  const {env, config, args, debug} = context;

  if (args.dryRun) reportDryRun(debug, 'No archive will be created.');

  debug('Compressing files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      if (!(await validateDistPath(platformContext))) {
        debug('Skipping because %s does not exist.', logTargetPath(env, platformDistPath));
        return;
      }

      const archivePath = resolvePath([config.outDir, config.archiveFilename], platformContext);

      if (await exists(archivePath)) {
        debug('Removing existing file %s...', logSourcePath(env, archivePath));

        if (!args.dryRun) {
          await fs.promises.rm(archivePath);
        }
      }

      if (args.verbose > VerbosityLevel.Verbose) {
        debug('Compressing %s...', logTargetPath(env, archivePath));
      }

      if (!args.dryRun) {
        const archive = createArchive(archivePath, debug);

        archive.directory(platformDistPath, resolveString(config.platformFolderName, platformContext));

        await archive.finalize();
      }

      if (args.verbose > VerbosityLevel.Verbose) {
        debug('Compressed %s', logTargetPath(env, archivePath));
      }
    }),
  );
};

export default zip;
