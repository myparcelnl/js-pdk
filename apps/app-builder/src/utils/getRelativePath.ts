import path from 'path';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type StringGenerator} from '../types/common';
import {type PdkBuilderContext} from '../types/command';
import {resolvePath} from './resolvePath';

export const getRelativePath = (filePath: OneOrMore<StringGenerator>, context: PdkBuilderContext): string => {
  return path.relative(context.env.cwd, resolvePath(filePath, context));
};
