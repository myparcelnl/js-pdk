import glob from 'fast-glob';
import {type PdkBuilderContext} from '../types';
import {usesPhpScoper} from './usesPhpScoper';
import {resolvePath} from './resolvePath';
import {logTargetPath} from './logTargetPath';
import {getPlatformDistPath} from './getPlatformDistPath';
import {copyFile} from './fs';
import {executePromises} from './executePromises';
import {addPlatformToContext} from './addPlatformToContext';

export const copyScopedFiles = async (context: PdkBuilderContext): Promise<void> => {
  if (!(await usesPhpScoper(context))) {
    return;
  }

  const {env, config, args, debug} = context;

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformDistPath = getPlatformDistPath(addPlatformToContext(context, platform));

      debug('Copying scoped files to %s', logTargetPath(platformDistPath, context));

      const scopedSourceDir = resolvePath(config.phpScoper.outDir, context);
      const scopedVendorDir = resolvePath(config.phpScoper.vendorOutDir, context);

      await Promise.all([
        ...glob.sync(`${scopedVendorDir}/**/*`, {cwd: env.cwd}).map(async (file) => {
          await copyFile(
            resolvePath(file, context),
            resolvePath(file.replace(scopedVendorDir, resolvePath([platformDistPath, 'vendor'], context)), context),
            context,
          );
        }),

        ...glob.sync(`${scopedSourceDir}/**/*`, {cwd: env.cwd}).map(async (file) => {
          await copyFile(
            resolvePath(file, context),
            resolvePath(file.replace(scopedSourceDir, platformDistPath), context),
            context,
          );
        }),
      ]);
    }),
  );

  debug('Finished copying scoped files');
};
