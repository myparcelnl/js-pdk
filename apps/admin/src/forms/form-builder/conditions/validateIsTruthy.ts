import {type AnyVal, type WithTarget} from '../types/common.types';
import {type WithCondition} from '../types/FormCondition.types';
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
