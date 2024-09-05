import glob, {type Options} from 'fast-glob';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type StringGenerator} from '../types/common';
import {type PdkBuilderContext} from '../types/command';
import {resolveStrings} from './resolveStrings';

export const globFiles = (
  patterns: OneOrMore<StringGenerator>,
  context: PdkBuilderContext,
  options: Options = {},
): string[] => {
  return glob.sync(resolveStrings(context, patterns), {cwd: context.env.cwd, ...options});
};
