import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {type PdkBuilderContext} from '../../types/command.types';

export const logRelativePath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.greenBright(getRelativePath(filePath, context));
};
