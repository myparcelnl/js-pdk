import path from 'path';
import {LiftoffEnv} from 'liftoff';
import {ResolvedPdkBuilderConfig} from '../types';
import {getPlatformFolderName} from './getPlatformFolderName';

export const getPlatformDistPath = (context: {
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
  platform: string;
}): string => {
  return path.resolve(context.env.cwd, context.config.outDir, getPlatformFolderName(context));
};
