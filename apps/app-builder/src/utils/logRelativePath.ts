import chalk from 'chalk';
import {type PdkBuilderContext} from '../types';
import {getRelativePath} from './getRelativePath';

export const logRelativePath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.greenBright(getRelativePath(filePath, context));
};
