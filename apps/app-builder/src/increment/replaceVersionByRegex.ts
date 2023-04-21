import {RegexVersionSource, VersionReplacer} from './types';
import {REGEX_VERSION} from '../constants';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
export const replaceVersionByRegex: VersionReplacer<RegexVersionSource> = ({match, contents, newVersion}) => {
  const regExp = RegExp(match.regex);
  const results = regExp.exec(contents);
  const matchedVersion = results?.[1];

  if (matchedVersion) {
    const foundString = results?.[0] ?? '';
    const replacement = foundString.replace(REGEX_VERSION, newVersion);

    contents = contents.replace(foundString, replacement);
  }

  return {
    existingVersion: matchedVersion,
    newContents: contents,
  };
};
