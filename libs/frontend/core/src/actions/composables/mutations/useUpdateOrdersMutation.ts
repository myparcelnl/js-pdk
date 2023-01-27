/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {EndpointOptions, usePdkApi} from '../../../sdk';
import {encodeArrayParameter, formToBody} from '../../../utils';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';

type UpdateOrdersInput = {
  orderIds: OneOrMore<string>;
  form?: FormInstance;
};

export const useUpdateOrdersMutation = () => {
  const queryClient = useQueryClient();
  const pdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, UpdateOrdersInput>(
    [EndpointName.UPDATE_ORDERS],
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
