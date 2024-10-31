import {type PdkBuilderContextWithPlatformArgs} from '../types/command.types';
import {resolvePath} from './resolvePath';
import {globFiles} from './globFiles';
import {copyFile} from './fs/copyFile';
import {logTargetPath} from './debug/logTargetPath';

export const copyScopedFilesForPlatform = async (context: PdkBuilderContextWithPlatformArgs): Promise<void> => {
  const {debug, config, args} = context;

  debug('Copying scoped files to %s', logTargetPath(args.platformOutDir, context));

  const scopedSourceDir = resolvePath(config.phpScoper.outDir, context);
  const scopedVendorDir = resolvePath(config.phpScoper.vendorOutDir, context);

  await Promise.all([
    ...globFiles(`${scopedVendorDir}/**/*`, context).map(async (file) => {
      const target = file.replace(scopedVendorDir, resolvePath([args.platformOutDir, 'vendor'], context));

      await copyFile(file, target, context);
    }),

    ...globFiles(`${scopedSourceDir}/**/*`, context).map(async (file) => {
      const target = file.replace(scopedSourceDir, args.platformOutDir);

      await copyFile(file, target, context);
    }),
  ]);
};
