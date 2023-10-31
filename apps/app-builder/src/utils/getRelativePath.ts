import path from 'path';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type PdkBuilderContext, type StringGenerator} from '../types';
import {resolvePath} from './resolvePath';

export const getRelativePath = (filePath: OneOrMore<StringGenerator>, context: PdkBuilderContext): string => {
  return path.relative(context.env.cwd, resolvePath(filePath, context));
};
