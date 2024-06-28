import {type ParsedEntry, type UpgradeSubContext} from '../types';
import {parseGitHubUrl} from '../parseGitHubUrl';
import {executeCommand} from '../../../utils';

export const getComposerPackageVersion = async (context: UpgradeSubContext): Promise<ParsedEntry[]> => {
  const {config, packageName} = context;

  const output = await executeCommand(context, config.composerCommand, ['show', '--format=json', packageName], {
    stdio: 'pipe',
  });

  const json = JSON.parse(output);

  return [
    {
      name: json.name,
      repository: parseGitHubUrl(json.source?.url ?? ''),
      version: json.versions[0],
    },
  ] satisfies ParsedEntry[];
};
