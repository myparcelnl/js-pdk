import {isOfType} from '@myparcel-dev/ts-utils';
import {type AnyVal, type IfAndMatcher, type IfOrMatcher, type WithCondition, type WithTarget} from '../types';
import {validateIsTruthy} from './validateIsTruthy';
import {validateIfCondition} from './validateIfCondition';

export const validateIfConditions = (
  input: Partial<WithCondition | WithTarget>,
  getValue: (target?: string) => AnyVal,
): boolean => {
  if (!isOfType<WithCondition>(input, '$if')) {
    if (isOfType<WithTarget>(input, '$target')) {
      return validateIsTruthy(input, getValue);
    }

    return true;
  }

  return input.$if.every((condition) => {
    let matches = true;

    if (isOfType<IfOrMatcher>(condition, '$or')) {
      matches = matches && condition.$or.some((condition) => validateIfCondition(condition, getValue));
    } else if (isOfType<IfAndMatcher>(condition, '$and')) {
      matches = matches && condition.$and.every((condition) => validateIfCondition(condition, getValue));
    } else {
      matches = validateIfCondition(condition, getValue);
    }

    return matches;
  });
};
