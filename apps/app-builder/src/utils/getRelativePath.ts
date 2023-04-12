import {LiftoffEnv} from 'liftoff';
import path from 'path';

export const getRelativePath = ({env, filePath}: {env: LiftoffEnv; filePath: string}): string => {
  return path.relative(env.cwd, filePath);
};
