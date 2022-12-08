import {OneOrMore, toArray} from '@myparcel/ts-utils';

export const encodeArrayParameter = (parameter: OneOrMore<string | number>): string => toArray(parameter).join(';');
