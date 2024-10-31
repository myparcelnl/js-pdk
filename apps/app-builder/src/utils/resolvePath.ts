import path from 'node:path';
import {type OneOrMore} from '@myparcel/ts-utils';
import {type StringGenerator} from '../types/common.types';
import {type PdkBuilderContext} from '../types/command.types';
import {resolveStrings} from './resolveStrings';

export const resolvePath = (string: OneOrMore<StringGenerator>, context: PdkBuilderContext): string =>
  path.resolve(context.env.cwd, ...resolveStrings(context, string));
