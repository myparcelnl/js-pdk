import path from 'path';
import {LiftoffEnv} from 'liftoff';

export const getRelativePath = ({env, filePath}: {env: LiftoffEnv; filePath: string}): string => {
  return path.relative(env.cwd, filePath);
};
