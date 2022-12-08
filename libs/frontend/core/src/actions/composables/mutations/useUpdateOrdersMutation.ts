/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {PdkEndpointDefinition, usePdkApi} from '../../../sdk';
import {convertDotNotationToObject, encodeArrayParameter} from '../../../utils';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {FormInstance} from '@myparcel/vue-form-builder';
import {OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_UPDATE_ORDERS} from '../queries';

type UpdateOrderInput = {
  orderIds: OneOrMore<string>;
  form?: FormInstance;
};

export const useUpdateOrdersMutation = () => {
  const queryClient = useQueryClient();

  const sdk = usePdkApi();
  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, UpdateOrderInput>(
    [QUERY_KEY_UPDATE_ORDERS],
    async (input) => {
      const options: PdkEndpointDefinition<EndpointName.UPDATE_ORDERS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
        },
        body: convertDotNotationToObject(input.form?.getValues() ?? {}),
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.updateOrders(options);
    },
    queryClient.defaultMutationOptions(),
  );
};
