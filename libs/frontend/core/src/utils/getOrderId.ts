import {useInstanceContext, useModalOrder} from '../composables';
import {InstanceContextKey} from '../types';

export const getOrderId = (): undefined | string => {
  return useModalOrder() ?? useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER);
};
