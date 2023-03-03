import {Ref, ref} from 'vue';
import {
  shipmentsCreateReturnAction,
  shipmentsDeleteAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../actions';
import {Carrier} from '@myparcel/sdk';
import {Shipment} from '@myparcel-pdk/common/src';
import {createActions} from '../services';
import {useAssetUrl} from './useAssetUrl';
import {useCarrier} from '../sdk';
import {useLoading} from './useLoading';

export type UseShipmentData = {
  actions: ReturnType<typeof createActions>;
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  useAssetUrl: typeof useAssetUrl;
};

export const useShipmentData = (shipment: Shipment.ModelShipment): UseShipmentData => {
  const {loading, actionCallbacks} = useLoading();

  const carrierName = shipment.carrier?.carrier?.name;
  const carriersQuery = carrierName ? useCarrier(carrierName) : undefined;

  return {
    actions: createActions(
      [shipmentsPrintAction, shipmentsFetchAction, shipmentsCreateReturnAction, shipmentsDeleteAction],
      {
        shipmentIds: shipment.id,
        orderIds: shipment.orderId,
      },
      actionCallbacks,
    ),

    carrier: carriersQuery?.data ?? ref(),

    loading,
    useAssetUrl,
  };
};
