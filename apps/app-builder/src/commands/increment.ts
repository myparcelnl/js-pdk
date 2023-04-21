import {COMMAND_INCREMENT_NAME, REGEX_VERSION, VerbosityLevel} from '../constants';
import {RegexVersionSource, VersionReplacerOutput, replaceVersionByRegex, replaceVersionInJson} from '../increment';
import {
  executePromises,
  getFileContents,
  initializeCommand,
  logSourcePath,
  logTargetPath,
  logTimeTaken,
  reportDryRun,
} from '../utils';
import {PdkBuilderCommand} from '../types';
import chalk from 'chalk';
import fs from 'fs';
import glob from 'fast-glob';
import {isOfType} from '@myparcel/ts-utils';
import path from 'path';

export const increment: PdkBuilderCommand = async ({env, config, args}) => {
  const {debug, time} = initializeCommand(COMMAND_INCREMENT_NAME);

  if (args.dryRun) {
    reportDryRun(debug, 'No files will be modified.');
  }

  const paths = config.versionSource.map((source) => source.path);
  const files = glob.sync(paths);

  await executePromises(
    args,
    files.map(async (file) => {
      const source = path.resolve(env.cwd, file);

      debug('Incrementing version number in %s', logSourcePath(env, source));

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const match = config.versionSource.find((source) => source.path === file)!;

      const contents = await getFileContents(source);
      const newVersion = args.version ?? config.version;

      let output: VersionReplacerOutput;

      if (isOfType<RegexVersionSource>(match, 'regex')) {
        debug('Replacing version number using regex');
        output = replaceVersionByRegex({match, contents, newVersion}, {config, args});
      } else if (source.endsWith('.json')) {
        debug('Replacing version number in JSON');
        output = replaceVersionInJson({match, contents, newVersion}, {config, args});
      } else {
        debug('Replacing version number');
        output = replaceVersionByRegex({match: {...match, regex: REGEX_VERSION}, contents, newVersion}, {config, args});
      }

      if (args.verbose >= VerbosityLevel.VeryVerbose) {
        if (output.existingVersion) {
          debug(
            'Replacing "%s" with "%s" in %s',
            chalk.red(output.existingVersion),
            chalk.green(newVersion),
            logTargetPath(env, source),
          );
        } else {
          debug('Adding "%s" to %s', chalk.green(newVersion), logTargetPath(env, source));
        }
      }

      if (!args.dryRun) {
        await fs.promises.writeFile(source, output.newContents);
      }
    }),
  );

  logTimeTaken(debug, time);
};
