import {computed, type ComputedRef, type Ref, ref, toValue, unref} from 'vue';
import {type MaybeRef} from '@vueuse/core';
import {type Shipment} from '@myparcel-dev/pdk-common';
import {type Carrier} from '@myparcel-dev/sdk';
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
  const shipment = computed(() => toValue(fetchQuery.data)!);

  const orderId = toValue(shipment)?.orderId;

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
        Object.values(toValue(obj) ?? {}).some((item) => (item ? toValue(item.isLoading) : false)),
      );
    }),
    shipment,
  };
};
