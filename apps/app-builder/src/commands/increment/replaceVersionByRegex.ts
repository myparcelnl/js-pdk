import chalk from 'chalk';
import {VerbosityLevel} from '../../constants';
import {type RegexVersionSource, type VersionReplacer} from './increment.types';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export const replaceVersionByRegex: VersionReplacer<RegexVersionSource> = (
  {match, contents, newVersion},
  {debug, args},
) => {
  const regExp = match.regex instanceof RegExp ? match.regex : new RegExp(match.regex, 'g');
  const results = regExp.exec(contents);
  const matchedVersion = results?.[1];

  if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
    debug('– Found %s in %s', chalk.cyanBright(matchedVersion), chalk.cyanBright(match.path));
  }

  if (matchedVersion) {
    const foundString = results?.[0] ?? '';
    const newString = foundString.replace(matchedVersion, newVersion);

    if (args.verbose >= VerbosityLevel.VeryVerbose) {
      debug('– Replacing %s with %s', chalk.redBright(foundString), chalk.greenBright(newString));
    }

    contents = contents.replace(foundString, newString);
  } else if (args.verbose >= VerbosityLevel.VeryVerbose) {
    debug(chalk.redBright('– No version found in %s for key %s'), chalk.cyanBright(match.path));
  }

  return {
    existingVersion: matchedVersion,
    newContents: contents,
  };
};
