/* eslint-disable no-case-declarations */
import {executeCommand} from '../../utils';
import {type NpmInfo} from '../../types';
import {UpgradeMode, type UpgradeSubContext} from './types';

const GITHUB_URL = 'https://github.com/';

export const getRepositoryUrl = async (name: string, {mode, env}: UpgradeSubContext): Promise<string> => {
  switch (mode) {
    case UpgradeMode.Yarn:
      const stdout = await executeCommand({env}, 'yarn', ['npm', 'info', name, '--json'], {});

      if (!stdout) {
        throw new Error(`Could not get info for ${name}`);
      }

      const npmInfo: NpmInfo = JSON.parse(stdout);

      if (!npmInfo?.repository) {
        throw new Error(`No repository found for ${name}`);
      }

      const repository = (typeof npmInfo.repository === 'string' ? npmInfo.repository : npmInfo.repository.url)
        .replace(/\.git$/, '')
        .replace(/^git\+/, '')
        .replace(/^github:/, '');

      return repository.startsWith(GITHUB_URL) ? repository : `${GITHUB_URL}${repository}/`;
  }

  throw new Error(`Unsupported upgrade mode: ${mode}`);
};
