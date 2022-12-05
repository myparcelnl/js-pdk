import {ActionFn, PdkAction} from '../data';
import {QueryId, useQueryStore} from '../stores';

export const refreshShipments: ActionFn<PdkAction.SHIPMENT_REFRESH> = async (parameters) => {
  const queryStore = useQueryStore();
  const query = queryStore.get(QueryId.ORDER);

  return query.data;
};
