/* eslint-disable no-case-declarations */
import {executeCommand} from '../../utils';
import {type NpmInfo} from '../../types';
import {VerbosityLevel} from '../../constants';
import {type ParsedEntry, UpgradeMode, type UpgradeSubContext} from './types';
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
    case UpgradeMode.Yarn:
      const stdout = await executeCommand(context, config.yarnCommand, ['npm', 'info', entry.name, '--json'], {});

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
