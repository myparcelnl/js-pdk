/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {encodeArrayParameter} from '../../../../utils';
import {fillShipmentsQueryData} from '../../../../pdk';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

export const useUpdateShipmentsMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.UpdateShipments,
    (input) => {
      const pdk = usePdkAdminApi();

      return pdk.updateShipments({
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
        fillShipmentsQueryData(queryClient, data);
      },
    },
  );
};
