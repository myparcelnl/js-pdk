import path from 'path';
import {type LiftoffEnv} from 'liftoff';
import {type PdkPlatformName, type ResolvedPdkBuilderConfig} from '../types';
import {getPlatformFolderName} from './getPlatformFolderName';

export const getPlatformDistPath = (context: {
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
  platform: PdkPlatformName;
}): string => {
  return path.resolve(context.env.cwd, context.config.outDir, getPlatformFolderName(context));
};
