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
        throw new Error(`Platform dist folder ${platformDistPath} does not exist. Run the "copy" command first.`);
      }

      const archivePath = path.resolve(env.cwd, config.outDir, archiveFilename);

      if (await exists(archivePath)) {
        debug('Removing existing file %s...', chalk.greenBright(path.relative(env.cwd, archivePath)));
        await fs.promises.rm(archivePath);
      }

      const archive = createArchive(archivePath, debug);

      debug('Compressing %s...', chalk.greenBright(path.relative(env.cwd, platformDistPath)));
      archive.directory(platformDistPath, platformFolderName);

      await archive.finalize();
    }),
  );

  debug('Done');
};
