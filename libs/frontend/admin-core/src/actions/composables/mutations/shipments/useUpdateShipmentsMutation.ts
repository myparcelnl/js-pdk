import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {fillShipmentsQueryData} from '../../../../pdk';

export const useUpdateShipmentsMutation = (): ResolvedQuery<BackendEndpoint.UpdateShipments> => {
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
