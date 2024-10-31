import {validateDistPath} from '../../utils/validateDistPath';
import {resolveString} from '../../utils/resolveString';
import {resolvePath} from '../../utils/resolvePath';
import {deleteFile} from '../../utils/fs/deleteFile';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {createArchive} from '../../utils/createArchive';
import {shouldModifyFiles} from '../../utils/command/shouldModifyFiles';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';

export const executeZipForPlatform = async (context: PdkBuilderContextWithPlatformArgs): Promise<void> => {
  const {config, debug, args} = context;

  if (!(await validateDistPath(context))) {
    return;
  }

  const archiveFilename = resolveString(config.archiveFilename, context).replace(/\//g, '-');
  const archivePath = resolvePath([config.outDir, archiveFilename], context);

  await deleteFile(context, archivePath);

  if (isVerbose(context)) {
    debug('Compressing %s...', logTargetPath(archivePath, context));
  }

  if (shouldModifyFiles(context)) {
    const archive = createArchive(archivePath, debug);

    archive.directory(args.platformOutDir, resolveString(config.platformFolderName, context));

    await archive.finalize();
  }

  if (isVerbose(context)) {
    debug('Compressed %s', logTargetPath(archivePath, context));
  }
};
