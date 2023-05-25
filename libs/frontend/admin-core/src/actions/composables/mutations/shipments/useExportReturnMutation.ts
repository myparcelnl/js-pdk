/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {useQueryClient} from '@tanstack/vue-query';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {toArray} from '@myparcel/ts-utils';
import {usePdkMutation} from '../orders';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';
import {setQueryOrder} from '../../../../helpers';

export const useExportReturnMutation = () => {
  const queryClient = useQueryClient();

  return usePdkMutation(
    BackendEndpoint.ExportReturn,
    (input) => {
      const pdk = usePdkAdminApi();

      return pdk.exportReturn({
        // @ts-expect-error todo
        parameters: {
          orderIds: encodeArrayParameter(input.orderIds),
          shipmentIds: encodeArrayParameter(input.shipmentIds),
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
