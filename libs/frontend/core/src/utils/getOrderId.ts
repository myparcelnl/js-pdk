import {useInstanceContext, useModalOrder} from '../composables';
import {AdminInstanceContextKey} from '../types';
import {AdminInstance} from '../data';

export const getOrderId = (instance?: AdminInstance): undefined | string => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.ORDER_IDENTIFIER] ??
    useInstanceContext(AdminInstanceContextKey.ORDER_IDENTIFIER)
  );
};
