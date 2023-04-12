import {ResolvedPdkBuilderConfig} from '../types';
import {resolveFileName} from './resolveFileName';

export const getPlatformFolderName = ({
  config,
  platform,
}: {
  config: ResolvedPdkBuilderConfig;
  platform: string;
}): string => {
  return resolveFileName(config.platformFolderName, config, platform);
};
