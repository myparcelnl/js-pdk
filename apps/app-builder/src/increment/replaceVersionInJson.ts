import {JsonVersionSource, VersionReplacer} from './types';

const JSON_SPACES_DEFAULT = 2;

export const replaceVersionInJson: VersionReplacer<JsonVersionSource> = ({match, contents, newVersion}, context) => {
  const key = match?.key ?? 'version';
  const json = JSON.parse(contents) ?? {};
  const existingVersion = json[key];

  return {
    existingVersion,
    newContents: `${JSON.stringify(
      {...json, [key]: newVersion},
      null,
      context?.config.jsonSpaces ?? JSON_SPACES_DEFAULT,
    )}\n`,
  };
};
