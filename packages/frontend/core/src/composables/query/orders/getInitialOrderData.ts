import {MyParcelPdk} from '@myparcel/pdk-frontend-shared';
import {useContextStore} from '../../../stores';

export const getInitialOrderData = (
  queryKey: readonly [string, string | undefined],
): undefined | MyParcelPdk.OrderDataContext => {
  const contextStore = useContextStore();
  const order = contextStore.context.orderData?.find((order) => order.externalIdentifier === queryKey[1]);

  return {...order} as MyParcelPdk.OrderDataContext;
};
