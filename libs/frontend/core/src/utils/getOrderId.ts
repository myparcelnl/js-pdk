import {useInstanceContext, useModalOrder} from '../composables';
import {InstanceContextKey} from '../types';
import {PdkInstance} from '../data';

export const getOrderId = (instance?: PdkInstance): undefined | string => {
  return (
    useModalOrder() ??
    instance?.context?.[InstanceContextKey.ORDER_IDENTIFIER] ??
    useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER)
  );
};
