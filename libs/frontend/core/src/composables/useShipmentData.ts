import {
  shipmentsCreateReturnAction,
  shipmentsDeleteAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../actions';
import {Carrier} from '@myparcel/sdk';
import {Ref} from 'vue';
import {Shipment} from '@myparcel-pdk/common';
import {createActions} from '../services';
import {useAssetUrl} from './useAssetUrl';
import {useCarriers} from '../sdk';
import {useLoading} from './useLoading';

export type UseShipmentData = {
  actions: ReturnType<typeof createActions>;
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  useAssetUrl: typeof useAssetUrl;
};

export const useShipmentData = (shipment: Shipment.ModelShipment): UseShipmentData => {
  const {loading, actionCallbacks} = useLoading();
  const carriersQuery = useCarriers(shipment.carrier?.name);

  return {
    actions: createActions(
      [shipmentsPrintAction, shipmentsFetchAction, shipmentsCreateReturnAction, shipmentsDeleteAction],
      {
        shipmentIds: shipment.id,
        orderIds: shipment.orderId,
      },
      actionCallbacks,
    ),

    carrier: carriersQuery.data,

    loading,
    useAssetUrl,
  };
};
