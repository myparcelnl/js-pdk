import {type OneOrMore} from '@myparcel/ts-utils';
import {type AdminInstance} from '../types/admin.types';
import {AdminInstanceContextKey} from '../data/constants';
import {useModalOrder} from '../composables/context/useModalOrder';
import {useInstanceContext} from '../composables/context/useInstanceContext';

export const getOrderId = (instance?: AdminInstance): undefined | OneOrMore<string> => {
  return (
    useModalOrder() ??
    instance?.context?.[AdminInstanceContextKey.OrderIdentifier] ??
    useInstanceContext(AdminInstanceContextKey.OrderIdentifier)
  );
};
