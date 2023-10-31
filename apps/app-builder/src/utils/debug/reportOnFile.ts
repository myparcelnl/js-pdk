import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {isVeryVeryVerbose} from '../command';
import {type PdkBuilderContext, type StringContaining} from '../../types';

const FILE = 'File';
const DIRECTORY = 'Directory';
const ALREADY_EXISTS = 'already exists';
const DOES_NOT_EXIST = 'does not exist';

const reportOnFile = (filePath: string, context: PdkBuilderContext, message: StringContaining<'%s'>): void => {
  if (!isVeryVeryVerbose(context)) return;

  context.debug(chalk.redBright(message), getRelativePath(filePath, context));
};

export const reportFileExists = (filePath: string, context: PdkBuilderContext): void => {
  reportOnFile(filePath, context, `${FILE} %s ${ALREADY_EXISTS}`);
};

export const reportFileDoesNotExist = (filePath: string, context: PdkBuilderContext): void => {
  reportOnFile(filePath, context, `${FILE} %s ${DOES_NOT_EXIST}`);
};

export const reportDirectoryExists = (dirPath: string, context: PdkBuilderContext): void => {
  reportOnFile(dirPath, context, `${DIRECTORY} %s ${ALREADY_EXISTS}`);
};

export const reportDirectoryDoesNotExist = (dirPath: string, context: PdkBuilderContext): void => {
  reportOnFile(dirPath, context, `${DIRECTORY} %s ${DOES_NOT_EXIST}`);
};
