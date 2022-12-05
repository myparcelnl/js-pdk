/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {PdkEndpointDefinition, usePdkApi} from '../../sdk';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {QUERY_KEY_UPDATE_ORDERS} from './queryKeys';
import {convertDotNotationToObject} from '@myparcel-pdk/frontend-shared';
import {toArray} from '@myparcel/ts-utils';

type UpdateOrderInput = {
  orderIds: string | string[];
  data: Partial<Plugin.ModelContextOrderDataContext>;
};

export const useUpdateOrdersQuery = () => {
  const queryClient = useQueryClient();

  const sdk = usePdkApi();
  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, UpdateOrderInput>(
    [QUERY_KEY_UPDATE_ORDERS],
    async (input) => {
      const options: PdkEndpointDefinition<EndpointName.UPDATE_ORDERS> = {
        parameters: {
          orderIds: toArray(input.orderIds).join(';'),
        },
        body: convertDotNotationToObject(input.data),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.updateOrders(options);
    },
    queryClient.defaultMutationOptions(),
  );
};
