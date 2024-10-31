import {type StringGenerator} from '../types/common.types';
import {type PdkBuilderContext} from '../types/command.types';
import {resolveStrings} from './resolveStrings';

export const resolveString = (stringGenerator: StringGenerator, context: PdkBuilderContext): string => {
  return resolveStrings(context, [stringGenerator])[0] ?? '';
};
