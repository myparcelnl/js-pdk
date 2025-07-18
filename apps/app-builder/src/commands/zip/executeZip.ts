import path from 'node:path';
import {resolveString} from '../../utils/resolveString';
import {resolvePath} from '../../utils/resolvePath';
import {deleteFile} from '../../utils/fs/deleteFile';
import {createDirectories} from '../../utils/fs/createDirectories';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {createArchive} from '../../utils/createArchive';
import {shouldModifyFiles} from '../../utils/command/shouldModifyFiles';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContext} from '../../types/command.types';

export const executeZip = async (context: PdkBuilderContext): Promise<void> => {
  const {config, debug} = context;

  const archiveOutDir = resolvePath(config.outDir, context);
  // Create the archive output directory if it doesn't exist
  await createDirectories(context, archiveOutDir);
  const archiveFilename = resolveString(config.archiveFilename, context).replace(/\//g, '-');

  const archivePath = resolvePath([archiveOutDir, archiveFilename], context);

  await deleteFile(context, archivePath);

  if (isVerbose(context)) {
    debug('Compressing %s...', logTargetPath(archivePath, context));
  }

  if (shouldModifyFiles(context)) {
    const archive = createArchive(archivePath, debug);

    archive.directory(
      resolvePath([config.outDir, config.buildFolderName], context),
      resolveString(config.buildFolderName, context),
    );

    await archive.finalize();
  }

  if (isVerbose(context)) {
    debug('Compressed %s', logTargetPath(archivePath, context));
  }
};
