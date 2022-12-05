import {toArray} from '@myparcel/ts-utils';

export const encodeArrayParameter = (parameter: string | string[]): string => toArray(parameter).join(';');
