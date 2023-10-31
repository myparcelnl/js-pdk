import chalk from 'chalk';
import {type PdkBuilderContext} from '../types';
import {getRelativePath} from './getRelativePath';

export const logSourcePath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.cyanBright(getRelativePath(filePath, context));
};
