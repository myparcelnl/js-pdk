/* eslint-disable @typescript-eslint/no-explicit-any */
import {set} from 'lodash-unified';

export const convertDotNotationToObject = (
  object: Record<string, any>,
  valueCallback: (value: any, key: string) => any = (value) => value,
): Record<string, any> => {
  const result: Record<string, any> = {};

  Object.entries(object).forEach(([key, value]) => {
    set(result, key, valueCallback(value, key));
  });

  return result;
};
