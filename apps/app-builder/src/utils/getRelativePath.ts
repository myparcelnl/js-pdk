import path from 'path';
import {type LiftoffEnv} from 'liftoff';

export const getRelativePath = ({env, filePath}: {env: LiftoffEnv; filePath: string}): string => {
  return path.relative(env.cwd, filePath);
};
