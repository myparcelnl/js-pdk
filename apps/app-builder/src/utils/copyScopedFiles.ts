import {type PdkBuilderContext} from '../types';
import {usesPhpScoper} from './usesPhpScoper';
import {resolvePath} from './resolvePath';
import {globFiles} from './globFiles';
import {getPlatformDistPath} from './getPlatformDistPath';
import {copyFile} from './fs';
import {executePromises} from './executePromises';
import {logTargetPath} from './debug';
import {addPlatformToContext} from './addPlatformToContext';

export const copyScopedFiles = async (context: PdkBuilderContext): Promise<void> => {
  if (!(await usesPhpScoper(context))) {
    return;
  }

  const {config, args, debug} = context;

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformDistPath = getPlatformDistPath(addPlatformToContext(context, platform));

      debug('Copying scoped files to %s', logTargetPath(platformDistPath, context));

      const scopedSourceDir = resolvePath(config.phpScoper.outDir, context);
      const scopedVendorDir = resolvePath(config.phpScoper.vendorOutDir, context);

      await Promise.all([
        ...globFiles(`${scopedVendorDir}/**/*`, context).map(async (file) => {
          await copyFile(
            file,
            file.replace(scopedVendorDir, resolvePath([platformDistPath, 'vendor'], context)),
            context,
          );
        }),

        ...globFiles(`${scopedSourceDir}/**/*`, context).map(async (file) => {
          await copyFile(file, file.replace(scopedSourceDir, platformDistPath), context);
        }),
      ]);
    }),
  );

  debug('Finished copying scoped files');
};
