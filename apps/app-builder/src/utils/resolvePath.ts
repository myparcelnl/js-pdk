import path from 'node:path';
import {type OneOrMore} from '@myparcel-dev/ts-utils';
import {type PdkBuilderContext} from '../types/command.types';
import {resolveStrings} from './resolveStrings';

export const resolvePath = (string: OneOrMore<string>, context: PdkBuilderContext): string =>
  path.resolve(context.env.cwd, ...resolveStrings(context, string));
