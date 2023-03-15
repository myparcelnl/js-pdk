import {Ref, ref} from 'vue';
import {
  shipmentsDeleteAction,
  shipmentsExportReturnAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../actions';
import {ActionDefinition} from '../types';
import {Carrier} from '@myparcel/sdk';
import {Shipment} from '@myparcel-pdk/common/src';
import {defineActions} from '../services';
import {useAssetUrl} from './useAssetUrl';
import {useCarrier} from '../sdk';
import {useLoading} from './useLoading';

export type UseShipmentData = {
  actions: ActionDefinition[];
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  useAssetUrl: typeof useAssetUrl;
};

export const useShipmentData = (shipment: Shipment.ModelShipment): UseShipmentData => {
  const {loading} = useLoading();

  const carrierName = shipment.carrier?.carrier?.name;
  const carriersQuery = carrierName ? useCarrier(carrierName) : undefined;

  return {
    actions: defineActions(
      [shipmentsPrintAction, shipmentsFetchAction, shipmentsExportReturnAction, shipmentsDeleteAction],
      {
        shipmentIds: shipment.id,
        orderIds: shipment.orderId,
      },
    ),

    carrier: carriersQuery?.data ?? ref(),

    loading,
    useAssetUrl,
  };
};
