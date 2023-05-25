import {OneOrMore} from '@myparcel/ts-utils';
import {AdminInstanceContextKey} from '../types';
import {AdminInstance} from '../data';
import {useInstanceContext, useModalOrder} from '../composables';

export const getOrderId = (instance?: AdminInstance): undefined | OneOrMore<string> => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
