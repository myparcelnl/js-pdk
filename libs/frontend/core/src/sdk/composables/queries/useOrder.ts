/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {InstanceContextKey} from '../../../types';
import {MaybeRef} from '@vueuse/core';
import {Pdk} from '@myparcel-pdk/frontend-shared';
import {getInitialOrderData} from '../../utils';
import {ref} from 'vue';
import {useInstanceContext} from '../../../composables';
import {useQuery} from '@tanstack/vue-query';
import {useSdk} from '../useSdk';

export const useOrder = (externalIdentifier?: MaybeRef<string | undefined>) => {
  const id = ref(externalIdentifier ?? useInstanceContext(InstanceContextKey.ORDER_IDENTIFIER));
  const queryKey = ['order', id.value] as const;

  console.log(id.value, queryKey);

  return useQuery<Pdk.PluginModelContextOrderDataContext>(
    queryKey,
    async () => {
      const sdk = useSdk();

      const options = {
        parameters: {
          orderIds: id.value,
        },
      };

      // es lint-disable-next-line @typescript-eslint/ban-ts-comment
      // @t s-ignore
      return sdk.getOrderData(options);
    },
    {
      enabled: Boolean(id.value),
      initialData: getInitialOrderData(queryKey),
    },
  );
};
