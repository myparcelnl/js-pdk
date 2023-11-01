import {type OneOrMore} from '@myparcel/ts-utils';
import {usePdkMutation} from '../usePdkMutation';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {BackendEndpoint} from '../../../../data';

export const usePrintOrdersMutation = (orderIds?: OneOrMore<string>): ResolvedQuery<BackendEndpoint.PrintOrders> => {
  return usePdkMutation(BackendEndpoint.PrintOrders, (input) => {
    const pdk = usePdkAdminApi();

    return pdk.printOrders({
      // @ts-expect-error custom endpoints are not typed correctly
      parameters: {
        format: input.format,
        output: input.output,
        position: input.position,
        // Input is used instead of orderIds parameter when bulk printing
        orderIds: encodeArrayParameter(orderIds ?? input.orderIds),
      },
    });
  });
};
