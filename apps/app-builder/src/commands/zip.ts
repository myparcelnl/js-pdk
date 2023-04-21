import {COMMAND_ZIP_NAME, VerbosityLevel} from '../constants';
import {
  createArchive,
  executePromises,
  exists,
  getPlatformDistPath,
  getPlatformFolderName,
  initializeCommand,
  logSourcePath,
  logTargetPath,
  logTimeTaken,
  reportDryRun,
  resolveFileName,
  validateDistPath,
} from '../utils';
import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

export const zip: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(COMMAND_ZIP_NAME);

  if (args.dryRun) reportDryRun(debug, 'No archive will be created.');

  debug('Compressing files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformDistPath = getPlatformDistPath({config, env, platform});

      if (!(await validateDistPath({config, env, platform, args}))) {
        debug('Skipping because %s does not exist.', logTargetPath(env, platformDistPath));
        return;
      }

      const archiveFilename = resolveFileName(config.archiveFilename, {config, platform, args});
      const archivePath = path.resolve(env.cwd, config.outDir, archiveFilename);

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

        archive.directory(platformDistPath, getPlatformFolderName({config, platform}));

        await archive.finalize();
      }

      if (args.verbose > VerbosityLevel.Verbose) {
        debug('Compressed %s', logTargetPath(env, archivePath));
      }
    }),
  );

  logTimeTaken(debug, time);
};
