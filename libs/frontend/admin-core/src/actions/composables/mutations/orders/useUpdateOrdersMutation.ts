/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpointOptions, usePdkAdminApi} from '../../../../sdk';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {setQueryOrder} from '../../../../helpers';
import {toArray} from '@myparcel/ts-utils';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateOrdersMutation = () => {
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
