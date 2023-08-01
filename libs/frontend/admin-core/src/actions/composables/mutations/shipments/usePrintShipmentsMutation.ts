import {useMutation} from '@tanstack/vue-query';
import {type BackendEndpoint} from '@myparcel-pdk/common';
import {type OneOrMore} from '@myparcel/ts-utils';
import {QUERY_KEY_SHIPMENT} from '../../queries';
import {encodeArrayParameter} from '../../../../utils';
import {type ResolvedQuery} from '../../../../stores';
import {usePdkAdminApi} from '../../../../sdk';
import {usePluginSettings} from '../../../../composables';

export const usePrintShipmentsMutation = (
  orderIds?: OneOrMore<string>,
  shipmentIds?: OneOrMore<number>,
): ResolvedQuery<BackendEndpoint.PrintShipments> => {
  return useMutation([QUERY_KEY_SHIPMENT, {orderIds, shipmentIds}], async () => {
    const pdk = usePdkAdminApi();
    const pluginSettings = usePluginSettings();

    return pdk.printShipments({
      // @ts-expect-error todo
      parameters: {
        format: pluginSettings.label.format,
        output: pluginSettings.label.output,
        position: pluginSettings.label.position,
        orderIds: encodeArrayParameter(orderIds),
        shipmentIds: encodeArrayParameter(shipmentIds),
      },
    });
  });
};
