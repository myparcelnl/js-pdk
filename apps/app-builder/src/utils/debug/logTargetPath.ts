import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {type PdkBuilderContext} from '../../types/command';

export const logTargetPath = (filePath: string, context: PdkBuilderContext): string => {
  return chalk.blueBright(getRelativePath(filePath, context));
};
