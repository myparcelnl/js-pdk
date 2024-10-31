import chalk from 'chalk';
import {getRelativePath} from '../getRelativePath';
import {isVeryVeryVerbose} from '../command/isVeryVeryVerbose';
import {type StringContaining} from '../../types/common.types';
import {type PdkBuilderContext} from '../../types/command.types';

const FILE = 'File';
const DIRECTORY = 'Directory';
const ALREADY_EXISTS = 'already exists';
const DOES_NOT_EXIST = 'does not exist';

const reportOnFile = (context: PdkBuilderContext, filePath: string, message: StringContaining<'%s'>): void => {
  if (!isVeryVeryVerbose(context)) return;

  context.debug(chalk.redBright(message), getRelativePath(filePath, context));
};

export const reportFileExists = (filePath: string, context: PdkBuilderContext): void => {
  reportOnFile(context, filePath, `${FILE} %s ${ALREADY_EXISTS}`);
};

export const reportFileDoesNotExist = (filePath: string, context: PdkBuilderContext): void => {
  reportOnFile(context, filePath, `${FILE} %s ${DOES_NOT_EXIST}`);
};

export const reportDirectoryExists = (dirPath: string, context: PdkBuilderContext): void => {
  reportOnFile(context, dirPath, `${DIRECTORY} %s ${ALREADY_EXISTS}`);
};

export const reportDirectoryDoesNotExist = (dirPath: string, context: PdkBuilderContext): void => {
  reportOnFile(context, dirPath, `${DIRECTORY} %s ${DOES_NOT_EXIST}`);
};
