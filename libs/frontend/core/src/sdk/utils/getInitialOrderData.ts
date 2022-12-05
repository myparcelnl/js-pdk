import {Plugin} from '@myparcel-pdk/frontend-shared';
import {useContextStore} from '../../stores';

export const getInitialOrderData = (
  queryKey: readonly [string, string | undefined],
): undefined | Plugin.ModelContextOrderDataContext => {
  const contextStore = useContextStore();
  const order = contextStore.context.orderData.find(
    (order: Plugin.ModelPdkOrder) => order.externalIdentifier === queryKey[1],
  );

  return {...order} as Plugin.ModelContextOrderDataContext;
};
