import chalk from 'chalk';
import {type PdkBuilderContext} from '../types';
import {getRelativePath} from './getRelativePath';

export const logTargetPath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.blueBright(getRelativePath(filePath, context));
};
