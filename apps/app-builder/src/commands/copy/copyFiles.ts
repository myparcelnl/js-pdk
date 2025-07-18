import {resolvePath} from '../../utils/resolvePath';
import {createDirectories} from '../../utils/fs/createDirectories';
import {copyFile} from '../../utils/fs/copyFile';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {type PdkBuilderContext} from '../../types/command.types';

export const copyFiles = async (context: PdkBuilderContext, sourceFiles: string[]): Promise<void> => {
  const {config, debug} = context;

  const destDir = resolvePath([config.outDir, config.buildFolderName], context);
  // Create the output directory if it doesn't exist
  await createDirectories(context, destDir);
  debug('Copying files to %s', logTargetPath(destDir, context));

  await Promise.all(
    sourceFiles.map(async (file) => {
      const source = resolvePath(file, context);
      const target = resolvePath([destDir, file], context);

      await copyFile(source, target, context);
    }),
  );

  debug('Finished copying files to %s', logTargetPath(destDir, context));
};
