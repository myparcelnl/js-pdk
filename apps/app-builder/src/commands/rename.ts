import path from 'path';
import chalk from 'chalk';
import {validateDistPath} from '../utils/validateDistPath';
import {replaceCaseSensitive} from '../utils/transformer/replaceCaseSensitive';
import {resolvePath} from '../utils/resolvePath';
import {globFiles} from '../utils/globFiles';
import {getPlatformDistPath} from '../utils/getPlatformDistPath';
import {renameFile} from '../utils/fs/renameFile';
import {executePromises} from '../utils/executePromises';
import {logRelativePath} from '../utils/debug/logRelativePath';
import {addPlatformToContext} from '../utils/addPlatformToContext';
import {type PdkBuilderCommand} from '../types/command';

const STRING_TO_REPLACE = 'myparcelnl';

const rename: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;

  debug('Renaming files for platforms %s', chalk.cyanBright(config.platforms.join(', ')));

  await executePromises(
    args,
    config.platforms.map(async (platform) => {
      const platformContext = addPlatformToContext(context, platform);
      const platformDistPath = getPlatformDistPath(platformContext);

      if (!(await validateDistPath(platformContext))) {
        return;
      }

      debug('Renaming files in %s', logRelativePath(platformDistPath, platformContext));

      const files = globFiles(`${platformDistPath}/**/*`, context, {
        ignore: [`${platformDistPath}/node_modules/**/*`, `${platformDistPath}/vendor/**/*`],
      });

      await Promise.all(
        files.map(async (file) => {
          const filename = path.basename(file);

          if (!filename.toLowerCase().includes(STRING_TO_REPLACE)) {
            return;
          }

          const target = resolvePath([platformDistPath, file], platformContext);

          await renameFile(
            file,
            target.replace(filename, replaceCaseSensitive(filename, STRING_TO_REPLACE, platform)),
            platformContext,
          );
        }),
      );

      debug('Finished renaming files in %s', logRelativePath(platformDistPath, platformContext));
    }),
  );
};

export default rename;
