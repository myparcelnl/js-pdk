import {type OneOrMore} from '@myparcel/ts-utils';

export const validateOrderId = <O extends undefined | OneOrMore<string>, A extends boolean = false>(
  orderId?: O,
  canBeArray?: A,
): A extends true ? NonNullable<O> : string => {
  if (!orderId) {
    throw new Error('no order id provided');
  }

  if (Array.isArray(orderId) && canBeArray !== true) {
    throw new Error('order id cannot be an array');
  }

  return orderId as A extends true ? NonNullable<O> : string;
};
