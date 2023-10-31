import path from 'path';
import {type PdkBuilderContext} from '../types';

export const getRelativePath = (filePath: string, context: PdkBuilderContext): string => {
  return path.relative(context.env.cwd, filePath);
};
