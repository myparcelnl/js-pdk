import {REGEX_VERSION, VerbosityLevel} from '../constants';
import {RegexVersionSource, VersionReplacer} from './types';
import chalk from 'chalk';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export const replaceVersionByRegex: VersionReplacer<RegexVersionSource> = (
  {match, contents, newVersion},
  {debug, args},
) => {
  const regExp = RegExp(match.regex);
  const results = regExp.exec(contents);
  const matchedVersion = results?.[1];

  if (matchedVersion) {
    const foundString = results?.[0] ?? '';
    const replacement = foundString.replace(REGEX_VERSION, newVersion);

    if (args.verbose >= VerbosityLevel.VeryVerbose) {
      debug('– Replacing %s with %s', chalk.redBright(foundString), chalk.greenBright(replacement));
    }

    contents = contents.replace(foundString, replacement);
  } else if (args.verbose >= VerbosityLevel.VeryVerbose) {
    debug(chalk.redBright('– No version found in %s for key %s'), chalk.cyanBright(match.path));
  }

  return {
    existingVersion: matchedVersion,
    newContents: contents,
  };
};
