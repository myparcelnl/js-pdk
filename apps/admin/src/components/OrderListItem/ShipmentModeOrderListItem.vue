<template>
  <DeliveryOptionsExcerpt v-if="shipments.length === 0" />

  <TransitionGroup
    :name="config?.transitions?.shipmentBox"
    appear>
    <ShipmentLabel
      v-for="shipment in data?.shipments ?? []"
      :key="`${data?.externalIdentifier}_${shipment.id}`"
      :shipment-id="shipment.id" />
  </TransitionGroup>

  <PdkDropdownButton
    v-test="[$.type.__name, order?.externalIdentifier]"
    :actions="actions"
    :size="Size.Small" />
</template>

<script lang="ts" setup>
import {computed, toValue} from 'vue';
import {get} from '@vueuse/core';
import {type Shipment, Size} from '@myparcel-pdk/common';
import {DeliveryOptionsExcerpt} from '../common';
import type {ActionDefinition, AnyActionDefinition} from '../../types/actions.types';
import {instantiateActions} from '../../services/instantiateActions';
import {useOrderData} from '../../composables/orders/useOrderData';
import {useAdminConfig} from '../../composables/useAdminConfig';
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions/definitions/orders';
import ShipmentLabel from './ShipmentLabel.vue';

const config = useAdminConfig();
const {query, order} = useOrderData();

const data = computed(() => toValue(query.data));

const shipments = computed(() => get(data)?.shipments ?? []);

const actions = computed<ActionDefinition[]>(() => {
  const actions: AnyActionDefinition[] = [];

  if (get(order)?.shipments?.some((item: Shipment.ModelShipment) => !item.deleted)) {
    actions.push(orderExportAction);
    actions.push({
      ...ordersPrintAction,
      standalone: true,
    });
    actions.push(ordersFetchAction);
  } else {
    actions.push({
      ...orderExportAction,
      standalone: true,
    });
    actions.push(ordersExportPrintShipmentsAction);
  }

  actions.push(ordersEditAction);

  return instantiateActions(actions, {
    orderIds: get(order)?.externalIdentifier,
    form: false,
  });
});
</script>
