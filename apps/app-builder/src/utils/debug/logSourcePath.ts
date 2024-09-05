import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {type PdkBuilderContext} from '../../types/command';

export const logSourcePath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.cyanBright(getRelativePath(filePath, context));
};
