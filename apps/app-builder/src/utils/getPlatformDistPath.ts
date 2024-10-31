import {type PdkBuilderContextWithPlatformArgs} from '../types/command.types';
import {resolvePath} from './resolvePath';

export const getPlatformDistPath = (context: PdkBuilderContextWithPlatformArgs): string => {
  return resolvePath([context.config.outDir, context.config.platformFolderName], context);
};
