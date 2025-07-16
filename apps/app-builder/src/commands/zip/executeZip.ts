import {resolveString} from '../../utils/resolveString';
import {resolvePath} from '../../utils/resolvePath';
import {deleteFile} from '../../utils/fs/deleteFile';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {createArchive} from '../../utils/createArchive';
import {shouldModifyFiles} from '../../utils/command/shouldModifyFiles';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContext} from '../../types/command.types';

export const executeZip = async (context: PdkBuilderContext): Promise<void> => {
  const {config, debug, args} = context;

  const archiveFilename = resolveString(config.archiveFilename, context).replace(/\//g, '-');
  const archivePath = resolvePath([config.outDir, archiveFilename], context);

  await deleteFile(context, archivePath);

  if (isVerbose(context)) {
    debug('Compressing %s...', logTargetPath(archivePath, context));
  }

  if (shouldModifyFiles(context)) {
    const archive = createArchive(archivePath, debug);

    archive.directory(args.outDir, false);

    await archive.finalize();
  }

  if (isVerbose(context)) {
    debug('Compressed %s', logTargetPath(archivePath, context));
  }
};
