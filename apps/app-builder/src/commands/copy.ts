import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import createDebug from 'debug';
import fs from 'fs';
import glob from 'fast-glob';
import path from 'path';

const debug = createDebug('pdk-builder:copy');

export const copy: PdkBuilderCommand = async ({env, config, args}) => {
  debug.enabled = Boolean(args.debug ?? config.debug);

  debug(
    'Copying files from %s to %s for platforms %s',
    chalk.yellow(config.source),
    chalk.cyan(config.distFolder),
    chalk.cyanBright(config.platforms.join(', ')),
  );

  if (args.dryRun) {
    debug('Dry run is enabled, not actually copying files');
  }

  const files = glob.sync(config.source);

  await Promise.all(
    config.platforms.map(async (platform) => {
      debug('Copying %s files to %s', chalk.cyan(platform), chalk.cyanBright(platform));

      return Promise.all(
        files.map(async (file) => {
          const source = path.resolve(env.cwd, file);
          const target = path.resolve(env.cwd, config.distFolder, platform, file);

          debug(
            '%s -> %s',
            chalk.yellow(path.relative(env.cwd, file)),
            chalk.cyan(path.relative(env.cwd, [config.distFolder, platform, file].join(path.sep))),
          );

          if (!args.dryRun) {
            await fs.promises.mkdir(path.dirname(target), {recursive: true});
            await fs.promises.copyFile(source, target);
          }
        }),
      );
    }),
  );
};
