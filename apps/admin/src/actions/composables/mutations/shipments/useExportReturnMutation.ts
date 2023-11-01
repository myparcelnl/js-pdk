import {useMutation, useQueryClient} from '@tanstack/vue-query';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../../queries';
import {encodeArrayParameter, setQueryOrder} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {type BackendEndpoint} from '../../../../data';

export const useExportReturnMutation = (
  orderIds?: OneOrMore<string>,
  shipmentIds?: OneOrMore<number>,
): ResolvedQuery<BackendEndpoint.ExportReturn> => {
  const queryClient = useQueryClient();

  return useMutation(
    [QUERY_KEY_SHIPMENT, {orderIds, shipmentIds}],
    () => {
      const pdk = usePdkAdminApi();

      return pdk.exportReturn({
        // @ts-expect-error todo
        parameters: {
          orderIds: encodeArrayParameter(orderIds),
          shipmentIds: encodeArrayParameter(shipmentIds),
        },
      });
    },
    {
      onSuccess: (data) => {
        toArray(data).forEach((order) => {
          setQueryOrder(queryClient, order);
        });
      },
    },
  );
};
