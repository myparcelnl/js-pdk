import {ActionFn, PdkAction} from '../data';
import {QueryId, useQueryStore} from '../stores';
import {convertDotNotationToObject, encodeArrayParameter} from '@myparcel-pdk/frontend-shared';
import {getExportContext} from '../pdk/utils';

export const updateOrders: ActionFn<PdkAction.ORDER_UPDATE> = ({orderId, form}) => {
  if (!orderId) {
    ({orderId, form} = getExportContext());
  }

  const queryStore = useQueryStore();
  const query = queryStore.get(QueryId.UPDATE_ORDERS);

  return query.mutateAsync({
    orderIds: encodeArrayParameter(orderId),
    data: convertDotNotationToObject(form?.getValues() ?? {}),
  });
};
