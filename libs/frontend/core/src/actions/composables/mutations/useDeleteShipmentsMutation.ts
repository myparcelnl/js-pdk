/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {EndpointName, Plugin} from '@myparcel-pdk/common';
import {PdkEndpointDefinition, usePdkApi} from '../../../sdk';
import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_DELETE_SHIPMENTS} from '../queries';
import {encodeArrayParameter} from '../../../utils';

type DeleteLabelsInput = {
  orderIds: OneOrMore<string>;
  shipmentIds: OneOrMore<number>;
};

export const useDeleteShipmentsMutation = () => {
  const queryClient = useQueryClient();
  const sdk = usePdkApi();

  return useMutation<Plugin.ModelContextOrderDataContext[], ApiException, DeleteLabelsInput>(
    [QUERY_KEY_DELETE_SHIPMENTS],
    (input) => {
      const options: PdkEndpointDefinition<EndpointName.DELETE_SHIPMENTS> = {
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
