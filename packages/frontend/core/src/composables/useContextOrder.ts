import {MyParcelPdk} from '@myparcel/pdk-frontend-shared';
import {useContextStore} from '../stores';

export const useContextOrder = (externalIdentifier: string): MyParcelPdk.OrderDataContext | undefined => {
  return useContextStore().context.orderData?.find((order) => {
    return order.externalIdentifier === externalIdentifier;
  });
};
