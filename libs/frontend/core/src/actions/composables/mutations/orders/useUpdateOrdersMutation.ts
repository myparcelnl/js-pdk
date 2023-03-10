/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkAdminApi} from '../../../../sdk';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateOrdersMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkAdminApi();

  return usePdkMutation(
    BackendEndpoint.UpdateOrders,
    async (input) => {
      const options: EndpointOptions<BackendEndpoint.UpdateOrders> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
        },
        body: [formToBody(input.form)],
      };

      // @ts-expect-error custom endpoints are not typed correctly
      return pdk.updateOrders(options);
    },
    queryClient.defaultMutationOptions(),
  );
};
