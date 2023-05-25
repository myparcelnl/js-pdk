/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../orders';
import {encodeArrayParameter} from '../../../../utils';
import {usePdkAdminApi} from '../../../../sdk';

export const usePrintOrdersMutation = () => {
  return usePdkMutation(BackendEndpoint.PrintOrders, (input) => {
    const pdk = usePdkAdminApi();

    return pdk.printOrders({
      // @ts-expect-error custom endpoints are not typed correctly
      parameters: {
        format: input.format,
        output: input.output,
        position: input.position,
        orderIds: encodeArrayParameter(input.orderIds),
      },
    });
  });
};
