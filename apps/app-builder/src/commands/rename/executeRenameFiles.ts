import path from 'node:path';
import {validateDistPath} from '../../utils/validateDistPath';
import {replaceCaseSensitive} from '../../utils/transformer/replaceCaseSensitive';
import {resolvePath} from '../../utils/resolvePath';
import {globFiles} from '../../utils/globFiles';
import {renameFile} from '../../utils/fs/renameFile';
import {logRelativePath} from '../../utils/debug/logRelativePath';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';
import {SOURCE_PLATFORM} from '../../constants';
import {RENAME_IGNORE_GLOBS} from './constants';

export const executeRenameFiles = async (context: PdkBuilderContextWithPlatformArgs): Promise<void> => {
  const {debug, args} = context;

  if (!(await validateDistPath(context))) {
    return;
  }

  if (isVerbose(context)) {
    debug('Renaming files in %s', logRelativePath(args.platformOutDir, context));
  }

  const stringToReplace = SOURCE_PLATFORM.toLowerCase();

  const files = globFiles(`${args.platformOutDir}/**/*`, context, {
    ignore: RENAME_IGNORE_GLOBS.map((path) => `${args.platformOutDir}/${path}`),
  });

  await Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file);

      if (!filename.toLowerCase().includes(stringToReplace)) {
        return;
      }

      const target = resolvePath([args.platformOutDir, file], context);
      const replacedFilename = replaceCaseSensitive(filename, stringToReplace, args.platform);

      await renameFile(file, target.replace(filename, replacedFilename), context);
    }),
  );
};
