import {useInstanceContext, useModalOrder} from '../composables';
import {AdminInstance} from '../data';
import {AdminInstanceContextKey} from '../types';
import {OneOrMore} from '@myparcel/ts-utils';

export const getOrderId = (instance?: AdminInstance): undefined | OneOrMore<string> => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
