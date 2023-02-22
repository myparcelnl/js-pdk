import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import {createArchive} from '../utils/createArchive';
import {createDebugger} from '../utils/createDebugger';
import {exists} from '../utils/exists';
import fs from 'fs';
import path from 'path';
import {reportDryRun} from '../utils/reportDryRun';
import {resolveFileName} from '../utils/resolveFileName';

export const compress: PdkBuilderCommand = async ({env, config, args}) => {
  const debug = createDebugger('compress');

  if (args.dryRun) reportDryRun(debug, 'No archive will be created.');

  debug('Compressing files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await Promise.all(
    config.platforms.map(async (platform) => {
      const archiveFilename = resolveFileName(config.archiveFilename, config, platform);
      const platformFolderName = resolveFileName(config.platformFolderName, config, platform);
      const platformDistPath = path.resolve(env.cwd, config.outDir, platformFolderName);

      if (!(await exists(platformDistPath))) {
        if (args.dryRun) {
          debug('Skipping because %s does not exist.', chalk.greenBright(path.relative(env.cwd, platformDistPath)));
          return;
        }

        throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run the "copy" command first.`);
      }

      const archivePath = path.resolve(env.cwd, config.outDir, archiveFilename);

      if (await exists(archivePath)) {
        debug('Removing existing file %s...', chalk.greenBright(path.relative(env.cwd, archivePath)));

        if (!args.dryRun) {
          await fs.promises.rm(archivePath);
        }
      }

      debug('Compressing %s...', chalk.greenBright(path.relative(env.cwd, platformDistPath)));

      if (!args.dryRun) {
        const archive = createArchive(archivePath, debug);

        archive.directory(platformDistPath, platformFolderName);

        await archive.finalize();
      }
    }),
  );

  debug('Done');
};
