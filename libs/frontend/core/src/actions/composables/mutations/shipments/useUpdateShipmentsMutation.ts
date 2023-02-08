/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {fillOrderQueryData} from '../../../../pdk';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.FETCH_SHIPMENTS,
    (input) => {
      const pdk = usePdkApi();

      return pdk.fetchShipments({
        // @ts-expect-error todo
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          shipmentIds: encodeArrayParameter(input.shipmentIds),
        },
      });
    },
    {
      ...queryClient.defaultMutationOptions(),
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
