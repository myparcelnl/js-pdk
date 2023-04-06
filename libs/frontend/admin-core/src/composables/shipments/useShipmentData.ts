import {ComputedRef, Ref, computed, ref} from 'vue';
import {
  shipmentsDeleteAction,
  shipmentsExportReturnAction,
  shipmentsPrintAction,
  shipmentsUpdateAction,
} from '../../actions';
import {ActionDefinition} from '../../types';
import {Carrier} from '@myparcel/sdk';
import {Shipment} from '@myparcel-pdk/common/src';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';
import {useAssetUrl} from '../useAssetUrl';
import {useCarrier} from '../../sdk';
import {useLoading} from '../useLoading';
import {useShipment} from './useShipment';

export type UseShipmentData = {
  actions: ActionDefinition[];
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  shipment: ComputedRef<Shipment.ModelShipment>;
  useAssetUrl: typeof useAssetUrl;
};

export const useShipmentData = (id: number): UseShipmentData => {
  const {loading} = useLoading();

  const query = useShipment(id);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shipment = computed(() => get(query.data)!);

  const carrierName = shipment.value?.carrier?.carrier?.name;
  const carriersQuery = carrierName ? useCarrier(carrierName) : undefined;

  return {
    actions: defineActions(
      [shipmentsPrintAction, shipmentsUpdateAction, shipmentsExportReturnAction, shipmentsDeleteAction],
      {
        shipmentIds: shipment.value?.id,
        orderIds: shipment.value?.orderId,
      },
    ),

    carrier: carriersQuery?.data ?? ref(),
    loading,
    shipment,
    useAssetUrl,
  };
};