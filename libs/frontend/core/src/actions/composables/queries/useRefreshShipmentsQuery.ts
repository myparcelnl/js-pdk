/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {useQuery, useQueryClient} from '@tanstack/vue-query';
import {ApiException} from '@myparcel/sdk';
import {OneOrMore} from '@myparcel/ts-utils';
import {Plugin} from '@myparcel-pdk/common';
import {QUERY_KEY_SHIPMENT} from './queryKeys';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';

interface RefreshShipmentsInput {
  orderIds?: OneOrMore<string>;
  shipmentIds?: OneOrMore<number>;
}

export const useRefreshShipmentsQuery = () => {
  const queryClient = useQueryClient();

  return useQuery<Plugin.ModelContextOrderDataContext[], ApiException, RefreshShipmentsInput>(
    [QUERY_KEY_SHIPMENT],
    () => {
      const sdk = usePdkApi();

      const options = {
        parameters: {
          orderIds: input.orderIds ? encodeArrayParameter(input.orderIds) : null,
          shipmentIds: input.shipmentIds ? encodeArrayParameter(input.shipmentIds) : null,
        },
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return sdk.refreshShipments(options);
    },
    {
      onSuccess: (data) => {
        console.log('useMutation', data);
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
