import chalk from 'chalk';
import {validateDistPath} from '../utils/validateDistPath';
import {resolveString} from '../utils/resolveString';
import {resolvePath} from '../utils/resolvePath';
import {getPlatformDistPath} from '../utils/getPlatformDistPath';
import {rmFile} from '../utils/fs/rmFile';
import {executePromises} from '../utils/executePromises';
import {logTargetPath} from '../utils/debug/logTargetPath';
import {createArchive} from '../utils/createArchive';
import {shouldModifyFiles} from '../utils/command/shouldModifyFiles';
import {isVerbose} from '../utils/command/isVerbose';
import {addPlatformToContext} from '../utils/addPlatformToContext';
import {type PdkBuilderCommand} from '../types/command';

const zip: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;

  debug('Compressing files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      if (!(await validateDistPath(platformContext))) {
        return;
      }

      const archivePath = resolvePath([config.outDir, config.archiveFilename], platformContext);

      await rmFile(archivePath, context);

      if (isVerbose(context)) {
        debug('Compressing %s...', logTargetPath(archivePath, platformContext));
      }

      if (shouldModifyFiles(context)) {
        const archive = createArchive(archivePath, debug);

        archive.directory(platformDistPath, resolveString(config.platformFolderName, platformContext));

        await archive.finalize();
      }

      if (isVerbose(context)) {
        debug('Compressed %s', logTargetPath(archivePath, platformContext));
      }
    }),
  );
};

export default zip;
