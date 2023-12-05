import {type PdkBuilderContext} from '../types';
import {type PdkPlatformName} from '../constants';
import {resolvePath} from './resolvePath';

export const getPlatformDistPath = (context: PdkBuilderContext<{platform: PdkPlatformName}>): string => {
  return resolvePath([context.config.outDir, context.config.platformFolderName], context);
};
