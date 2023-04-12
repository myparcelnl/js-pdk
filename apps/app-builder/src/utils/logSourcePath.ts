import {LiftoffEnv} from 'liftoff';
import chalk from 'chalk';
import {getRelativePath} from './getRelativePath';

export const logSourcePath = (env: LiftoffEnv, filePath: string): string => {
  return chalk.cyanBright(getRelativePath({env, filePath}));
};
