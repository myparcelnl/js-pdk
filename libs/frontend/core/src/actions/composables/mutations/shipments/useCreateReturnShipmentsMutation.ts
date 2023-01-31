import {EndpointName} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../../utils';
import {fillOrderQueryData} from '../../../../pdk';
import {usePdkApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useCreateReturnShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    EndpointName.CREATE_RETURN_SHIPMENTS,
    (input) => {
      const pdk = usePdkApi();

      return pdk.createReturnShipments({
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
