import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {isOfType} from '@myparcel/ts-utils';
import {executePromises, getFileContents, logSourcePath, reportDryRun} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {
  type RegexVersionSource,
  replaceVersionByRegex,
  replaceVersionInJson,
  type VersionReplacerOutput,
} from '../increment';
import {REGEX_VERSION, VerbosityLevel} from '../constants';

const increment: PdkBuilderCommand = async ({env, config, args, debug}) => {
  const newVersion = args.version ?? config.version;

  if (args.dryRun) reportDryRun(debug, 'No files will be modified.');

  debug('Incrementing version to %s', chalk.greenBright(newVersion));

  const matches = config.versionSource.map((source) => ({
    files: glob.sync(source.path, {cwd: env.cwd}),
    source,
  }));

  await executePromises(
    args,
    matches.map(async ({files, source: match}) => {
      return Promise.all(
        files.map(async (file) => {
          const filePath = path.resolve(env.cwd, file);
          const contents = await getFileContents(filePath);

          let output: VersionReplacerOutput;

          if (args.verbose >= VerbosityLevel.Verbose) {
            debug('Processing %s', logSourcePath(env, filePath));
          }

          if (isOfType<RegexVersionSource>(match, 'regex')) {
            output = replaceVersionByRegex({match, contents, newVersion}, {config, args, debug});
          } else if (filePath.endsWith('.json')) {
            output = replaceVersionInJson({match, contents, newVersion}, {config, args, debug});
          } else {
            output = replaceVersionByRegex(
              {match: {...match, regex: REGEX_VERSION}, contents, newVersion},
              {config, args, debug},
            );
          }

          if (!args.dryRun) {
            await fs.promises.writeFile(filePath, output.newContents);
          }
        }),
      );
    }),
  );
};

export default increment;
