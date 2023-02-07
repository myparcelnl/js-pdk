/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointOptions, usePdkApi} from '../../../../sdk';
import {encodeArrayParameter, formToBody} from '../../../../utils';
import {EndpointName} from '@myparcel-pdk/common/src';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateOrdersMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkApi();

  return usePdkMutation(
    EndpointName.UPDATE_ORDERS,
    async (input) => {
      const options: EndpointOptions<EndpointName.UPDATE_ORDERS> = {
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
