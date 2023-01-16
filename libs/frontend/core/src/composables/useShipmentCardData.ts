import {shipmentPrintAction, shipmentRefreshAction} from '../actions';
import {Carrier} from '@myparcel/sdk';
import {Ref} from 'vue';
import {Shipment} from '@myparcel-pdk/common';
import {createActions} from '../services';
import {useAssetUrl} from './useAssetUrl';
import {useCarriers} from '../sdk';
import {useLoading} from './useLoading';

export type UseShipmentCardData = {
  actions: ReturnType<typeof createActions>;
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  useAssetUrl: typeof useAssetUrl;
};

export const useShipmentCardData = (shipment: Shipment.ModelShipment): UseShipmentCardData => {
  const {loading, setLoading} = useLoading();
  const carriersQuery = useCarriers(shipment.carrier?.name);

  return {
    actions: createActions(
      [shipmentPrintAction, shipmentRefreshAction],
      {
        shipmentIds: shipment.id,
        orderIds: shipment.orderId,
      },
      {
        start() {
          setLoading(true);
        },
        end() {
          setLoading(false);
        },
      },
    ),

    carrier: carriersQuery.data,

    loading,
    useAssetUrl,
  };
};
