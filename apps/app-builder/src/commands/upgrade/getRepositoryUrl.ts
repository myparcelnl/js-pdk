/* eslint-disable no-case-declarations */
import {executeCommand} from '../../utils';
import {type NpmInfo} from '../../types';
import {VerbosityLevel} from '../../constants';
import {NodePackageManager, type ParsedEntry, UpgradeMode, type UpgradeSubContext} from './types';
import {parseGitHubUrl} from './parseGitHubUrl';

export const getRepositoryUrl = async (entry: ParsedEntry, context: UpgradeSubContext): Promise<undefined | string> => {
  if (entry.repository) {
    return entry.repository;
  }

  if (context.args.verbose >= VerbosityLevel.VeryVerbose) {
    context.debug(`Getting repository URL for ${entry.name}`);
  }

  const {config, mode} = context;

  switch (mode) {
    case UpgradeMode.Node:
      let stdout: string;

      switch (config.nodePackageManager) {
        case NodePackageManager.Yarn:
          stdout = await executeCommand(
            context,
            config.nodePackageManagerCommand,
            ['npm', 'info', entry.name, '--json'],
            {},
          );
          break;

        case NodePackageManager.Bun:
          // TODO: Change this when bun has a command that can do this
          stdout = await executeCommand(context, 'npm', ['info', entry.name, '--json'], {});
          break;
      }

      if (!stdout) {
        return;
      }

      const npmInfo: NpmInfo = JSON.parse(stdout);

      if (!npmInfo?.repository) {
        return;
      }

      return parseGitHubUrl(typeof npmInfo.repository === 'string' ? npmInfo.repository : npmInfo.repository.url);
  }

  throw new Error(`Unsupported upgrade mode: ${mode}`);
};
