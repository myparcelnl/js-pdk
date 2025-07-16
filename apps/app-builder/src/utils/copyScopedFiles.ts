import {type PdkBuilderContext} from '../types/command.types';
import {resolvePath} from './resolvePath';
import {globFiles} from './globFiles';
import {copyFile} from './fs/copyFile';
import {logTargetPath} from './debug/logTargetPath';

export const copyScopedFiles = async (context: PdkBuilderContext): Promise<void> => {
  const {debug, config, args} = context;

  debug('Copying scoped files to %s', logTargetPath(args.outDir, context));

  const scopedSourceDir = resolvePath(config.phpScoper.outDir, context);
  const scopedVendorDir = resolvePath(config.phpScoper.vendorOutDir, context);

  await Promise.all([
    ...globFiles(`${scopedVendorDir}/**/*`, context).map(async (file) => {
      const target = file.replace(scopedVendorDir, resolvePath([args.outDir, 'vendor'], context));

      await copyFile(file, target, context);
    }),

    ...globFiles(`${scopedSourceDir}/**/*`, context).map(async (file) => {
      const target = file.replace(scopedSourceDir, args.outDir);

      await copyFile(file, target, context);
    }),
  ]);
};
