import {type PdkBuilderContext} from '../types/command.types';
import {resolveStrings} from './resolveStrings';

export const resolveString = (string: string, context: PdkBuilderContext): string => {
  return resolveStrings(context, [string])[0] ?? '';
};
