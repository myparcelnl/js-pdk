import {type OneOrMore, toArray} from '@myparcel/ts-utils';

export const encodeArrayParameter = (parameter?: null | OneOrMore<string | number | undefined>): string => {
  return toArray(parameter).filter(Boolean).join(';');
};
