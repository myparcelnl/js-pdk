import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter, formToBody, setQueryOrder} from '../../../../utils';
import {type BackendEndpointOptions} from '../../../../types';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const useUpdateOrdersMutation = (orderIds?: OneOrMore<string>): ResolvedQuery<BackendEndpoint.UpdateOrders> => {
  const queryClient = useQueryClient();
  const pdk = usePdkAdminApi();

  return usePdkMutation(
    BackendEndpoint.UpdateOrders,
    async (input) => {
      const options: BackendEndpointOptions<BackendEndpoint.UpdateOrders> = {
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
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
