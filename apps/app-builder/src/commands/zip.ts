import AdmZip from 'adm-zip';
import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import createDebug from 'debug';
import glob from 'fast-glob';
import path from 'path';
import {resolveFileName} from '../utils/resolveFileName';

const debug = createDebug('pdk-builder:zip');

export const zip: PdkBuilderCommand = async ({env, config, args}) => {
  debug.enabled = Boolean(args.debug ?? config.debug);

  debug('Zipping files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  if (args.dryRun) {
    debug('Dry run is enabled, not actually making zips');
  }

  await Promise.all(
    config.platforms.map(async (platform) => {
      debug('Zipping %s files', chalk.cyan(platform));

      const zipFile = resolveFileName(config.zipFileName, config, platform);

      return Promise.all(
        // eslint-disable-next-line @typescript-eslint/require-await
        glob.sync('./**/*', {cwd: path.resolve(config.distFolder, platform)}).map(async (file) => {
          const target = path.resolve(env.cwd, config.distFolder, platform, file);

          console.log(target);

          if (!args.dryRun) {
            const zip = new AdmZip();

            zip.addLocalFile(target);

            zip.writeZip(zipFile);
          }
        }),
      );
    }),
  );
};
