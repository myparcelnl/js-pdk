import {type StringGenerator} from '../types/common';
import {type PdkBuilderContext} from '../types/command';
import {resolveStrings} from './resolveStrings';

export const resolveString = (stringGenerator: StringGenerator, context: PdkBuilderContext): string => {
  return resolveStrings(context, [stringGenerator])[0] ?? '';
};
