/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import {encodeArrayParameter} from '../../../../utils';
import {setQueryOrder} from '../../../../helpers';
import {toArray} from '@myparcel/ts-utils';
import {usePdkAdminApi} from '../../../../sdk';
import {usePdkMutation} from '../orders';
import {useQueryClient} from '@tanstack/vue-query';

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
