import path from 'node:path';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type PdkBuilderContext} from '../types/command.types';
import {resolvePath} from './resolvePath';

export const getRelativePath = (filePath: OneOrMore<string>, context: PdkBuilderContext): string => {
  return path.relative(context.env.cwd, resolvePath(filePath, context));
};
