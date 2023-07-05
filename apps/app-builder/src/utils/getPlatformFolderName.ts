import {type PdkPlatformName, type ResolvedPdkBuilderConfig} from '../types';
import {resolveFileName} from './resolveFileName';

export const getPlatformFolderName = ({
  config,
  platform,
}: {
  config: ResolvedPdkBuilderConfig;
  platform: PdkPlatformName;
}): string => {
  return resolveFileName(config.platformFolderName, {config, platform});
};
