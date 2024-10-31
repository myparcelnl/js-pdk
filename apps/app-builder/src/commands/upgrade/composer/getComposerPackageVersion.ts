import {type ParsedEntry, type PdkBuilderUpgradeContext} from '../upgrade.types';
import {parseGitHubUrl} from '../parseGitHubUrl';
import {executeCommand} from '../../../utils/executeCommand';

export const getComposerPackageVersion = async (context: PdkBuilderUpgradeContext): Promise<ParsedEntry[]> => {
  const {packageName, config} = context;

  const output = await executeCommand(context, config.composerCommand, ['show', '--format=json', packageName], {
    stdio: 'pipe',
  });

  // Output may contain plain text composer warnings even when using json format, so ignore everything until the first opening curly brace
  const json = JSON.parse(output.slice(output.indexOf('{')));

  return [
    {
      name: json.name,
      repository: parseGitHubUrl(json.source?.url ?? ''),
      version: json.versions[0],
    },
  ] satisfies ParsedEntry[];
};
