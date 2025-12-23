import {type OneOrMore} from '@myparcel-dev/ts-utils';

export const validateId = <O extends undefined | OneOrMore<string | number>, A extends boolean = false>(
  id?: O,
  canBeArray?: A,
): A extends true ? NonNullable<O> : string => {
  if (!id) {
    throw new Error('no id provided');
  }

  if (Array.isArray(id) && canBeArray !== true) {
    throw new Error('id cannot be an array');
  }

  return id as A extends true ? NonNullable<O> : string;
};
