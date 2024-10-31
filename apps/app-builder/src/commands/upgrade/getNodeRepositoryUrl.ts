import {executeCommand} from '../../utils/executeCommand';
import {type NpmInfo} from '../../types/common.types';
import {RUN_NPM, RUN_YARN} from '../../constants';
import {type ParsedEntry, type PdkBuilderUpgradeContext} from './upgrade.types';
import {parseGitHubUrl} from './parseGitHubUrl';
import {NodePackageManager} from './enums';

export const getNodeRepositoryUrl = async (
  context: PdkBuilderUpgradeContext,
  entry: ParsedEntry,
): Promise<undefined | string> => {
  let stdout: string;

  switch (context.config.nodePackageManager) {
    case NodePackageManager.Yarn:
      stdout = await executeCommand(context, RUN_YARN, [RUN_NPM, 'info', entry.name, '--json'], {});
      break;

    case NodePackageManager.Bun:
      // TODO: Change this when bun has a command that can do this
      stdout = await executeCommand(context, RUN_NPM, ['info', entry.name, '--json'], {});
      break;
  }

  if (!stdout) {
    return;
  }

  const npmInfo: NpmInfo = JSON.parse(stdout);

  if (!npmInfo?.repository) {
    return;
  }

  const repositoryUrl = typeof npmInfo.repository === 'string' ? npmInfo.repository : npmInfo.repository.url;

  return parseGitHubUrl(repositoryUrl);
};
