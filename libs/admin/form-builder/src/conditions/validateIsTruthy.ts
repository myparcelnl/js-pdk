import {type AnyVal, type WithCondition, type WithTarget} from '../types';
import {validateIfCondition} from './validateIfCondition';

export const validateIsTruthy = (
  $if: Partial<WithCondition> & WithTarget,
  getValue: (target?: string) => AnyVal,
): boolean => {
  return validateIfCondition(
    {
      ...$if,
      $nin: [false, 0],
    },
    getValue,
  );
};
