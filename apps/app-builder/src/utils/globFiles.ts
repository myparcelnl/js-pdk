import glob, {type Options} from 'fast-glob';
import {type OneOrMore} from '@myparcel-dev/ts-utils';
import {type PdkBuilderContext} from '../types/command.types';
import {resolveStrings} from './resolveStrings';

export const globFiles = (patterns: OneOrMore<string>, context: PdkBuilderContext, options: Options = {}): string[] => {
  return glob.sync(resolveStrings(context, patterns), {cwd: context.env.cwd, ...options});
};
