import {resolvePath} from '../../utils/resolvePath';
import {copyFile} from '../../utils/fs/copyFile';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';

export const copyForPlatform = async (
  context: PdkBuilderContextWithPlatformArgs,
  sourceFiles: string[],
): Promise<void> => {
  const {args, debug} = context;

  debug('Copying files to %s', logTargetPath(args.platformOutDir, context));

  await Promise.all(
    sourceFiles.map(async (file) => {
      const source = resolvePath(file, context);
      const target = resolvePath([args.platformOutDir, file], context);

      await copyFile(source, target, context);
    }),
  );

  debug('Finished copying files to %s', logTargetPath(args.platformOutDir, context));
};
