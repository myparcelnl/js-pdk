import glob, {type Options} from 'fast-glob';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type PdkBuilderContext, type StringGenerator} from '../types';
import {resolveStrings} from './resolveStrings';

export const globFiles = (
  patterns: OneOrMore<StringGenerator>,
  context: PdkBuilderContext,
  options: Options = {},
): string[] => {
  return glob.sync(resolveStrings(context, patterns), {cwd: context.env.cwd, ...options});
};
