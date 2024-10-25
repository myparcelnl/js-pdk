import {useMutation} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../../queries/queryKeys';
import {encodeArrayParameter} from '../../../../utils/encodeArrayParameter';
import {type ResolvedQuery} from '../../../../stores/types';
import {usePdkAdminApi} from '../../../../sdk/composables/usePdkAdminApi';
import {usePluginSettings} from '../../../../composables/context/usePluginSettings';

export const usePrintShipmentsMutation = (
  orderIds?: OneOrMore<string>,
  shipmentIds?: OneOrMore<number>,
): ResolvedQuery<BackendEndpoint.PrintShipments> => {
  return useMutation(
    [
      QUERY_KEY_SHIPMENT,
      {
        orderIds,
        shipmentIds,
      },
    ],
    async (input) => {
      const pdk = usePdkAdminApi();
      const pluginSettings = usePluginSettings();

      return pdk.printShipments({
        // @ts-expect-error todo
        parameters: {
          format: pluginSettings.label.format,
          output: pluginSettings.label.output,
          position: pluginSettings.label.position,
          // Input is used instead of parameters when bulk printing
          orderIds: encodeArrayParameter(orderIds ?? input.orderIds),
          shipmentIds: encodeArrayParameter(shipmentIds ?? input.shipmentIds),
        },
      });
    },
  );
};
