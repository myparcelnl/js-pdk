import {isOfType} from '@myparcel/ts-utils';
import {resolvePath} from '../../utils/resolvePath';
import {writeFile} from '../../utils/fs/writeFile';
import {getFileContents} from '../../utils/fs/getFileContents';
import {exists} from '../../utils/fs/exists';
import {reportFileDoesNotExist} from '../../utils/debug/reportOnFile';
import {logSourcePath} from '../../utils/debug/logSourcePath';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderContext} from '../../types/command.types';
import {REGEX_VERSION} from '../../constants';
import {replaceVersionInJson} from './replaceVersionInJson';
import {replaceVersionByRegex} from './replaceVersionByRegex';
import {
  type IncrementCommandArgs,
  type RegexVersionSource,
  type VersionReplacerOutput,
  type VersionSource,
} from './increment.types';

export const incrementVersionInFile = async (
  context: PdkBuilderContext<IncrementCommandArgs>,
  match: VersionSource,
  file: string,
): Promise<void> => {
  const {config, args, debug} = context;
  const newVersion = args.version ?? config.version;

  const filePath = resolvePath(file, context);

  if (!(await exists(filePath))) {
    reportFileDoesNotExist(filePath, context);
    return;
  }

  const contents = await getFileContents(filePath);

  if (isVerbose(context)) {
    debug('Processing %s', logSourcePath(filePath, context));
  }

  let output: VersionReplacerOutput;

  if (isOfType<RegexVersionSource>(match, 'regex')) {
    output = replaceVersionByRegex({match, contents, newVersion}, context);
  } else if (filePath.endsWith('.json')) {
    output = replaceVersionInJson({match, contents, newVersion}, context);
  } else {
    output = replaceVersionByRegex({match: {...match, regex: REGEX_VERSION}, contents, newVersion}, context);
  }

  await writeFile(context, filePath, output.newContents);
};
