import chalk from 'chalk';
import {VerbosityLevel} from '../constants';
import {type JsonVersionSource, type VersionReplacer} from './types';

const JSON_SPACES_DEFAULT = 2;

export const replaceVersionInJson: VersionReplacer<JsonVersionSource> = (
  {match, contents, newVersion},
  {config, debug, args},
) => {
  const key = match?.key ?? 'version';
  const json = JSON.parse(contents) ?? {};
  const existingVersion = json[key];

  if (args.verbose >= VerbosityLevel.VeryVerbose) {
    if (existingVersion) {
      debug(
        '– Setting JSON key %s to %s (was %s)',
        chalk.yellowBright(key),
        chalk.greenBright(newVersion),
        chalk.redBright(existingVersion),
      );
    } else {
      debug(
        chalk.redBright('– No version found in %s for key %s'),
        chalk.cyanBright(match.path),
        chalk.cyanBright(key),
      );
    }
  }

  return {
    existingVersion,
    newContents: `${JSON.stringify({...json, [key]: newVersion}, null, config.jsonSpaces ?? JSON_SPACES_DEFAULT)}\n`,
  };
};
