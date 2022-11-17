import {Pdk} from '@myparcel-pdk/frontend-shared';
import {useContextStore} from '../../stores';

export const getInitialOrderData = (
  queryKey: readonly [string, string | undefined],
): undefined | Pdk.PluginModelContextOrderDataContext => {
  const contextStore = useContextStore();
  const order = contextStore.context.orderData?.find(
    (order: Pdk.PluginModelPdkOrder) => order.externalIdentifier === queryKey[1],
  );

  return {...order} as Pdk.PluginModelContextOrderDataContext;
};
