import {resolvePath} from '../../utils/resolvePath';
import {copyFile} from '../../utils/fs/copyFile';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {type PdkBuilderContext} from '../../types/command.types';

export const copyFiles = async (context: PdkBuilderContext, sourceFiles: string[]): Promise<void> => {
  const {args, debug} = context;

  debug('Copying files to %s', logTargetPath(args.outDir, context));

  await Promise.all(
    sourceFiles.map(async (file) => {
      const source = resolvePath(file, context);
      const target = resolvePath([args.outDir, file], context);

      await copyFile(source, target, context);
    }),
  );

  debug('Finished copying files to %s', logTargetPath(args.outDir, context));
};
