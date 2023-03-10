import {useInstanceContext, useModalOrder} from '../composables';
import {AdminInstance} from '../data';
import {AdminInstanceContextKey} from '../types';

export const getOrderId = (instance?: AdminInstance): undefined | string => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
