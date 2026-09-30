import {isDef} from '@vueuse/core';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';

/** Joins values with `;` and URL-encodes the result, because the SDK appends parameters to the URL raw. */
export const encodeArrayParameter = (parameter?: null | OneOrMore<string | number | undefined>): string => {
  return encodeURIComponent(toArray(parameter).filter(isDef).join(';'));
};
