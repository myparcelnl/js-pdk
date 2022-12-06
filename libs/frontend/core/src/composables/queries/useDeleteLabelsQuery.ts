/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin, encodeArrayParameter} from '@myparcel-pdk/frontend-shared';
import {PdkEndpointDefinition, usePdkApi} from '../../sdk';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_DELETE_LABELS} from './queryKeys';

type DeleteLabelsInput = {
  orderIds: OneOrMore<string>;
  shipmentIds: OneOrMore<number>;
};

export const useDeleteLabelsQuery = () => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, DeleteLabelsInput>(
    [QUERY_KEY_DELETE_LABELS],
    (input) => {
      const options: PdkEndpointDefinition<EndpointName.DELETE_LABELS> = {
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          shipmentIds: encodeArrayParameter(input.shipmentIds),
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.deleteLabels(options);
    },
    queryClient.defaultMutationOptions(),
  );
};
