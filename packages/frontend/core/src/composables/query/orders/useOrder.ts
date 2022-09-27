/* eslint-disable no-console */
import {InstanceContextKey, MyParcelPdk} from '@myparcel/pdk-frontend-shared';
import {MaybeRef} from '@vueuse/core';
import {getInitialOrderData} from './getInitialOrderData';
import {ref} from 'vue';
import {useInstanceContext} from '../../index';
import {useQuery} from 'vue-query';
import {useSdk} from '../../sdk/useSdk';

export const useOrder = (externalIdentifier?: MaybeRef<string | undefined>) => {
  const id = ref(externalIdentifier ?? useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER));
  const queryKey = ['order', id.value] as const;

  return useQuery<MyParcelPdk.OrderDataContext>(
    queryKey,
    async () => {
      const sdk = useSdk();

      const options = {
        parameters: {
          orderIds: id.value,
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return sdk.getOrderData(options);
    },
    {
      enabled: Boolean(id.value),
      initialData: getInitialOrderData(queryKey),
    },
  );
};
