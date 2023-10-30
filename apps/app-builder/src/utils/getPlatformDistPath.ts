import {type PdkBuilderContext, type PdkPlatformName} from '../types';
import {resolvePath} from './resolvePath';

export const getPlatformDistPath = (context: PdkBuilderContext<{platform: PdkPlatformName}>): string => {
  return resolvePath([context.config.outDir, context.config.platformFolderName], context);
};
