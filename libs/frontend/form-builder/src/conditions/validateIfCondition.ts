import {isOfType} from '@myparcel/ts-utils';
import {
  type AnyVal,
  type EqualMatcher,
  type GreaterThanMatcher,
  type GreaterThanOrEqualMatcher,
  type InMatcher,
  type LessThanMatcher,
  type LessThanOrEqualMatcher,
  type NotEqualMatcher,
  type NotInMatcher,
  type SingleIfMatcher,
  type WithTarget,
} from '../types';
import {validateIsTruthy} from './validateIsTruthy';

export const validateIfCondition = ($if: SingleIfMatcher, getValue: (target?: string) => AnyVal): boolean => {
  const value = getValue($if.$target);

  let matches = false;

  if (isOfType<EqualMatcher>($if, '$eq')) {
    matches = value === $if.$eq;
  } else if (isOfType<GreaterThanMatcher>($if, '$gt')) {
    matches = Number(value) > $if.$gt;
  } else if (isOfType<GreaterThanOrEqualMatcher>($if, '$gte')) {
    matches = Number(value) >= $if.$gte;
  } else if (isOfType<InMatcher>($if, '$in')) {
    matches = $if.$in.includes(value);
  } else if (isOfType<LessThanMatcher>($if, '$lt')) {
    matches = Number(value) < $if.$lt;
  } else if (isOfType<LessThanOrEqualMatcher>($if, '$lte')) {
    matches = Number(value) <= $if.$lte;
  } else if (isOfType<NotEqualMatcher>($if, '$ne')) {
    matches = value !== $if.$ne;
  } else if (isOfType<NotInMatcher>($if, '$nin')) {
    matches = !$if.$nin.includes(value);
  } else if (isOfType<WithTarget>($if, '$target')) {
    matches = validateIsTruthy($if, getValue);
  }

  return matches;
};
