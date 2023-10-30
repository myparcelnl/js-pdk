import {type PdkBuilderContext, type StringGenerator} from '../types';
import {resolveStrings} from './resolveStrings';

export const resolveString = (stringGenerator: StringGenerator, context: PdkBuilderContext): string => {
  return resolveStrings(context, [stringGenerator])[0] ?? '';
};
