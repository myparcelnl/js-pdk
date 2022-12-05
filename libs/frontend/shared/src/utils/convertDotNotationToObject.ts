/* eslint-disable @typescript-eslint/no-explicit-any */
import {set} from 'lodash-unified';

export const convertDotNotationToObject = (object: Record<string, any>) => {
  const result: Record<string, any> = {};

  Object.entries(object).forEach(([key, value]) => {
    set(result, key, value);
  });

  return result;
};
