import {computed, type ComputedRef, type Ref, ref, unref} from 'vue';
import {get, type MaybeRef} from '@vueuse/core';
import {type Shipment} from '@myparcel-pdk/common';
import {type Carrier} from '@myparcel/sdk';
import {type AnyActionDefinition} from '../../types';
import {useQueryStore} from '../../stores';
import {instantiateActions} from '../../services';
import {useFetchCarrier} from '../../sdk';
import {shipmentActions} from '../../actions';
import {useShipment} from './useShipment';

export type UseShipmentData = {
  actions: AnyActionDefinition[];
  carrier: Ref<Carrier | undefined>;
  loading: Ref<boolean>;
  shipment: ComputedRef<Shipment.ModelShipment>;
};

export const useShipmentData = (id: MaybeRef<number>): UseShipmentData => {
  const shipmentId = unref(id);

  const queryStore = useQueryStore();
  const fetchQuery = useShipment(shipmentId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const shipment = computed(() => get(fetchQuery.data)!);

  const orderId = get(shipment)?.orderId;

  const allQueries = [
    queryStore.getQueriesForShipment(shipmentId),
    orderId ? queryStore.getQueriesForOrder(orderId) : undefined,
  ].filter(Boolean);

  const carrierName = shipment.value?.carrier?.name;
  const carriersQuery = carrierName ? useFetchCarrier(carrierName) : undefined;

  return {
    actions: instantiateActions(shipmentActions, {
      shipmentIds: shipment.value?.id,
      orderIds: shipment.value?.orderId,
    }),

    carrier: carriersQuery?.data ?? ref(),
    loading: computed(() => {
      return allQueries.some((obj) =>
        Object.values(get(obj) ?? {}).some((item) => (item ? get(item.isLoading) : false)),
      );
    }),
    shipment,
  };
};
