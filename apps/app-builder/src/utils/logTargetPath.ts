import {LiftoffEnv} from 'liftoff';
import chalk from 'chalk';
import {getRelativePath} from './getRelativePath';

export const logTargetPath = (env: LiftoffEnv, filePath: string): string => {
  return chalk.blueBright(getRelativePath({env, filePath}));
};
