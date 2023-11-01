import {type OneOrMore} from '@myparcel/ts-utils';
import {type AdminInstance, AdminInstanceContextKey} from '../types';
import {useInstanceContext, useModalOrder} from '../composables';

export const getOrderId = (instance?: AdminInstance): undefined | OneOrMore<string> => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
