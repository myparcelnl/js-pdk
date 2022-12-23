import {OneOrMore, toArray} from '@myparcel/ts-utils';

export const encodeArrayParameter = (parameter?: null | OneOrMore<string | number>): string => {
  if (!parameter) {
    return '';
  }

  return toArray(parameter).join(';');
};
