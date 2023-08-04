import {type LiftoffEnv} from 'liftoff';
import chalk from 'chalk';
import {getRelativePath} from './getRelativePath';

export const logRelativePath = (env: LiftoffEnv, filePath: string): string => {
  return chalk.greenBright(getRelativePath({env, filePath}));
};
