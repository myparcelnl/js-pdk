import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../../queries';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

export const useUpdateShipmentsMutation = (
  orderIds?: OneOrMore<string>,
  shipmentIds?: OneOrMore<number>,
): ResolvedQuery<BackendEndpoint.UpdateShipments> => {
  const queryClient = useQueryClient();

  return useMutation(
    [QUERY_KEY_SHIPMENT, {orderIds, shipmentIds}],
    () => {
      const pdk = usePdkAdminApi();

      return pdk.updateShipments({
        // @ts-expect-error todo
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
          shipmentIds: encodeArrayParameter(shipmentIds),
        },
      });
    },
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
