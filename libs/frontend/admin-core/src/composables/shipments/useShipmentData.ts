import {type ComputedRef, type Ref, computed, ref} from 'vue';
import {get} from '@vueuse/core';
import {type Shipment} from '@myparcel-pdk/common';
import {type Carrier} from '@myparcel/sdk';
import {useLoading} from '../useLoading';
import {useAssetUrl} from '../useAssetUrl';
import {type ActionDefinition} from '../../types';
import {defineActions} from '../../services';
import {useCarrier} from '../../sdk';
import {shipmentActions} from '../../actions';
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
    actions: defineActions(shipmentActions, {
      shipmentIds: shipment.value?.id,
      orderIds: shipment.value?.orderId,
    }),

    carrier: carriersQuery?.data ?? ref(),
    loading,
    shipment,
    useAssetUrl,
  };
};
