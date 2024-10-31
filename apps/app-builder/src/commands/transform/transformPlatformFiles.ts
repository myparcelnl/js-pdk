import chalk from 'chalk';
import {replaceCaseSensitive} from '../../utils/transformer/replaceCaseSensitive';
import {getOccurrences} from '../../utils/transformer/getOccurrences';
import {resolvePath} from '../../utils/resolvePath';
import {writeFile} from '../../utils/fs/writeFile';
import {getFileContents} from '../../utils/fs/getFileContents';
import {logTargetPath} from '../../utils/debug/logTargetPath';
import {isVeryVeryVerbose} from '../../utils/command/isVeryVeryVerbose';
import {type PdkBuilderContextWithPlatformArgs} from '../../types/command.types';
import {SOURCE_PLATFORM} from '../../constants';

export const transformPlatformFiles = async (
  context: PdkBuilderContextWithPlatformArgs,
  file: string,
): Promise<void> => {
  const {args, debug} = context;

  const sourcePath = resolvePath(file, context);
  const contents = await getFileContents(sourcePath);

  const occurrences = getOccurrences(contents, SOURCE_PLATFORM);

  if (occurrences.length > 0) {
    if (isVeryVeryVerbose(context)) {
      debug(
        'Replacing %s occurrences of "%s" with "%s" in %s',
        chalk.greenBright(occurrences.length),
        chalk.red(SOURCE_PLATFORM),
        chalk.green(args.platform),
        logTargetPath(file, context),
      );
    }

    const newContents = replaceCaseSensitive(contents, SOURCE_PLATFORM, args.platform);

    await writeFile(context, sourcePath, newContents);
  }
};
