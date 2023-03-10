import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import {createDebugger} from '../utils/createDebugger';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';
import {reportDryRun} from '../utils/reportDryRun';
import {resolveFileName} from '../utils/resolveFileName';

export const copy: PdkBuilderCommand = async ({env, config, args}) => {
  const debug = createDebugger(`copy`);

  if (args.dryRun) reportDryRun(debug, 'No files will be copied.');

  const files = glob.sync(config.source);

  debug(
    'Copying %s files from %s to %s for output "%s"',
    chalk.greenBright(files.length),
    chalk.yellow(config.source),
    chalk.cyan(path.relative(env.cwd, config.outDir)),
    chalk.cyanBright(config.platforms.join(', ')),
  );

  await Promise.all(
    config.platforms.map(async (platform) => {
      const platformFolderPath = `${config.outDir}/${resolveFileName(config.platformFolderName, config, platform)}`;
      const relativeDistFolderPath = path.relative(env.cwd, platformFolderPath);

      debug('Copying files to %s', chalk.greenBright(relativeDistFolderPath));

      const promises = await Promise.all(
        files.map(async (file) => {
          const source = path.resolve(env.cwd, file);
          const target = path.resolve(env.cwd, platformFolderPath, file);

          if (args.verbose >= 3) {
            debug(
              '%s -> %s',
              chalk.yellow(path.relative(env.cwd, file)),
              chalk.cyan(path.relative(env.cwd, [platformFolderPath, file].join(path.sep))),
            );
          }

          if (!args.dryRun) {
            await fs.promises.mkdir(path.dirname(target), {recursive: true});
            await fs.promises.copyFile(source, target);
          }
        }),
      );

      debug('Finished copying files to %s', chalk.greenBright(relativeDistFolderPath));

      return promises;
    }),
  );

  debug('Done');
};
