import {ActionFn, PdkAction} from '../data';
import {QueryId, useQueryStore} from '../stores';
import {encodeArrayParameter} from '@myparcel-pdk/frontend-shared';

export const deleteLabels: ActionFn<PdkAction.LABEL_DELETE> = (parameters) => {
  const queryStore = useQueryStore();
  const query = queryStore.get(QueryId.DELETE_LABELS);

  return query.mutateAsync({
    orderIds: encodeArrayParameter(parameters.orderIds as string),
    shipmentIds: encodeArrayParameter(parameters.shipmentIds as string),
  });
};
