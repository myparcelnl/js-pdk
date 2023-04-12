import {LiftoffEnv} from 'liftoff';
import {ResolvedPdkBuilderConfig} from '../types';
import {getPlatformFolderName} from './getPlatformFolderName';
import path from 'path';

export const getPlatformDistPath = (context: {
  config: ResolvedPdkBuilderConfig;
  env: LiftoffEnv;
  platform: string;
}): string => {
  return path.resolve(context.env.cwd, context.config.outDir, getPlatformFolderName(context));
};
