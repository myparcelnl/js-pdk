import path from 'path';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type PdkBuilderContext, type StringGenerator} from '../types';
import {type PdkPlatformName} from '../constants';
import {resolveStrings} from './resolveStrings';

export const resolvePath = (
  string: OneOrMore<StringGenerator>,
  context: PdkBuilderContext<{platform?: PdkPlatformName}>,
): string => path.resolve(context.env.cwd, ...resolveStrings(context, string));
