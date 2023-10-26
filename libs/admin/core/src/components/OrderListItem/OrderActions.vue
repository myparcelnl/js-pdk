<template>
  <PdkDropdownButton
    v-test="[$.type.__name, order?.externalIdentifier]"
    :size="Size.Small"
    :actions="actions" />
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {type Shipment, Size} from '@myparcel-pdk/common';
import {type ActionDefinition, type AnyActionDefinition} from '../../types';
import {instantiateActions} from '../../services';
import {useOrderData} from '../../composables';
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions';

const {order} = useOrderData();

const actions = computed<ActionDefinition[]>(() => {
  const actions: AnyActionDefinition[] = [];

  if (get(order)?.shipments?.some((item: Shipment.ModelShipment) => !item.deleted)) {
    actions.push(orderExportAction);
    actions.push({...ordersPrintAction, standalone: true});
    actions.push(ordersFetchAction);
  } else {
    actions.push({...orderExportAction, standalone: true});
    actions.push(ordersExportPrintShipmentsAction);
  }

  actions.push(ordersEditAction);

  return instantiateActions(actions, {orderIds: get(order)?.externalIdentifier, form: false});
});
</script>
