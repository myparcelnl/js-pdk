import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {type PdkBuilderContext} from '../../types';

export const logTargetPath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.blueBright(getRelativePath(filePath, context));
};
