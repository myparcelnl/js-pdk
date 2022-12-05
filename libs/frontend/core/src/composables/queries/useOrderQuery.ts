/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {QUERY_KEY_ORDER, QUERY_KEY_SHIPMENT} from './queryKeys';
import {getInitialOrderData, usePdkApi} from '../../sdk';
import {useContext, useModalOrder} from '../index';
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {InstanceContextKey} from '../../types';
import {MaybeRef} from '@vueuse/core';
import {Plugin} from '@myparcel-pdk/common';
import {ref} from 'vue';

export const useOrderQuery = (externalIdentifier?: MaybeRef<string | undefined>) => {
  const id = ref(externalIdentifier ?? useModalOrder() ?? useContext(InstanceContextKey.ORDER_IDENTIFIER));

  const queryKey = [QUERY_KEY_ORDER, id.value] as const;
  const queryClient = useQueryClient();

  return useQuery<Plugin.ModelContextOrderDataContext>(
    queryKey,
    () => {
      const sdk = usePdkApi();

      const options = {
        parameters: {
          orderIds: id.value as string,
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.getOrders(options);
    },
    {
      ...queryClient.defaultQueryOptions(),
      enabled: Boolean(id.value),
      initialData: getInitialOrderData(queryKey),
      onSuccess: (data) => {
        data.shipments?.forEach((shipment) => {
          queryClient.setQueryData([QUERY_KEY_ORDER, id.value, QUERY_KEY_SHIPMENT, shipment.id], shipment);
        });
      },
    },
  );
};
