import path from 'path';
import fs from 'fs';
import glob from 'fast-glob';
import chalk from 'chalk';
import {isOfType} from '@myparcel/ts-utils';
import {executePromises, getFileContents, initializeCommand, logSourcePath, logTimeTaken, reportDryRun} from '../utils';
import {PdkBuilderCommand} from '../types';
import {RegexVersionSource, VersionReplacerOutput, replaceVersionByRegex, replaceVersionInJson} from '../increment';
import {COMMAND_INCREMENT_NAME, REGEX_VERSION, VerbosityLevel} from '../constants';

export const increment: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(COMMAND_INCREMENT_NAME);
  const newVersion = args.version ?? config.version;

  if (args.dryRun) {
    reportDryRun(debug, 'No files will be modified.');
  }

  debug('Incrementing version to %s', chalk.greenBright(newVersion));

  const paths = config.versionSource.map((source) => source.path);
  const files = glob.sync(paths);

  await executePromises(
    args,
    files.map(async (file) => {
      const source = path.resolve(env.cwd, file);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const match = config.versionSource.find((source) => source.path === file)!;

      const contents = await getFileContents(source);

      let output: VersionReplacerOutput;

      if (args.verbose >= VerbosityLevel.Verbose) {
        debug('Processing %s', logSourcePath(env, source));
      }

      if (isOfType<RegexVersionSource>(match, 'regex')) {
        output = replaceVersionByRegex({match, contents, newVersion}, {config, args, debug});
      } else if (source.endsWith('.json')) {
        output = replaceVersionInJson({match, contents, newVersion}, {config, args, debug});
      } else {
        output = replaceVersionByRegex(
          {match: {...match, regex: REGEX_VERSION}, contents, newVersion},
          {config, args, debug},
        );
      }

      if (!args.dryRun) {
        await fs.promises.writeFile(source, output.newContents);
      }
    }),
  );

  logTimeTaken(debug, time);
};
