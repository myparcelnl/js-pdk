import chalk from 'chalk';
import {isOfType} from '@myparcel/ts-utils';
import {usesPhpScoper} from '../utils/usesPhpScoper';
import {resolvePath} from '../utils/resolvePath';
import {globFiles} from '../utils/globFiles';
import {writeFile} from '../utils/fs/writeFile';
import {getFileContents} from '../utils/fs/getFileContents';
import {exists} from '../utils/fs/exists';
import {executePromises} from '../utils/executePromises';
import {reportFileDoesNotExist} from '../utils/debug/reportOnFile';
import {logSourcePath} from '../utils/debug/logSourcePath';
import {isVerbose} from '../utils/command/isVerbose';
import {type PdkBuilderCommand} from '../types/command';
import {type RegexVersionSource, type VersionReplacerOutput} from '../increment/types';
import {replaceVersionInJson} from '../increment/replaceVersionInJson';
import {replaceVersionByRegex} from '../increment/replaceVersionByRegex';
import {REGEX_VERSION} from '../constants';

const increment: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;
  const newVersion = args.version ?? config.version;

  debug('Incrementing version to %s', chalk.greenBright(newVersion));

  const hasPhpScoper = await usesPhpScoper(context);

  const matches = config.versionSource.map((source) => {
    const sources = [source.path];

    if (hasPhpScoper) {
      sources.push(`${config.phpScoper.outDir}/${source.path}`);
      sources.push(`${config.phpScoper.vendorOutDir}/${source.path}`);
    }

    return {source, files: globFiles(sources, context)};
  });

  await executePromises(
    args,
    matches.map(async ({files, source: match}) => {
      return Promise.all(
        files.sort().map(async (file) => {
          const filePath = resolvePath(file, context);

          if (!(await exists(filePath))) {
            reportFileDoesNotExist(filePath, context);
            return;
          }

          const contents = await getFileContents(filePath);

          let output: VersionReplacerOutput;

          if (isVerbose(context)) {
            debug('Processing %s', logSourcePath(filePath, context));
          }

          if (isOfType<RegexVersionSource>(match, 'regex')) {
            output = replaceVersionByRegex({match, contents, newVersion}, context);
          } else if (filePath.endsWith('.json')) {
            output = replaceVersionInJson({match, contents, newVersion}, context);
          } else {
            output = replaceVersionByRegex({match: {...match, regex: REGEX_VERSION}, contents, newVersion}, context);
          }

          await writeFile(filePath, output.newContents, context);
        }),
      );
    }),
  );
};

export default increment;
