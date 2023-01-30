/* eslint-disable no-console,@typescript-eslint/explicit-module-boundary-types */
import {EndpointName} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../utils';
import {fillOrderQueryData} from '../../../pdk';
import {usePdkApi} from '../../../sdk';
import {usePdkMutation} from './usePdkMutation';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    EndpointName.FETCH_SHIPMENTS,
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
      onSuccess: (data) => {
        fillOrderQueryData(queryClient, data);
      },
    },
  );
};
