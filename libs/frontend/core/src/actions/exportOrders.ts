import {ActionFn, PdkAction} from '../data';
import {QueryId, useQueryStore} from '../stores';
import {convertDotNotationToObject, encodeArrayParameter} from '@myparcel-pdk/frontend-shared';

export const exportOrders: ActionFn<PdkAction.ORDER_EXPORT | PdkAction.ORDER_EXPORT_PRINT> = (parameters) => {
  const {form, orderIds, print} = parameters;
  const queryStore = useQueryStore();
  const query = queryStore.get(QueryId.EXPORT_ORDERS);

  return query.mutateAsync({
    orderIds: encodeArrayParameter(orderIds),
    print: print,
    data: convertDotNotationToObject(form?.getValues() ?? {}),
  });
};
