import {useInstanceContext, useModalOrder} from '../composables';
import {InstanceContextKey} from '../types';
import {PdkAppInstance} from '../data';

export const getOrderId = (instance?: PdkAppInstance): undefined | string => {
  return (
    useModalOrder() ??
    instance?.context?.[InstanceContextKey.ORDER_IDENTIFIER] ??
    useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER)
  );
};
