import {type OneOrMore} from '@myparcel-dev/ts-utils';
import {type AdminInstance} from '../types';
import {AdminInstanceContextKey} from '../data';
import {useInstanceContext, useModalOrder} from '../composables';

export const getOrderId = (instance?: AdminInstance): undefined | OneOrMore<string> => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
