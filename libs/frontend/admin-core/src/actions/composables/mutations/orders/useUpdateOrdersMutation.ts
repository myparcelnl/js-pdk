import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {type BackendEndpointOptions, usePdkAdminApi} from '../../../../sdk';
import {setQueryOrder} from '../../../../helpers';

export const useUpdateOrdersMutation = (): ResolvedQuery<BackendEndpoint.UpdateOrders> => {
  const queryClient = useQueryClient();
  const pdk = usePdkAdminApi();

  return usePdkMutation(
    BackendEndpoint.UpdateOrders,
    async (input) => {
      const options: BackendEndpointOptions<BackendEndpoint.UpdateOrders> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
        },
        body: [formToBody(input.form)],
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return pdk.updateOrders(options);
    },
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess(orders) {
        toArray(orders).forEach((order) => {
          setQueryOrder(queryClient, order);
        });
      },
    },
  );
};
