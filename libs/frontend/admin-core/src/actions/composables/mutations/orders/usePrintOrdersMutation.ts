import {BackendEndpoint} from '@myparcel-pdk/common';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';

export const usePrintOrdersMutation = (): ResolvedQuery<BackendEndpoint.PrintOrders> => {
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
