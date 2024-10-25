<template>
  <PdkModal
    v-test="$.type.__name"
    :actions="actions"
    :modal-key="AdminModalKey.ShipmentOptions"
    title="shipment_options_title">
    <component
      :is="ShipmentOptionsModalForm"
      :key="JSON.stringify(orderIds)"
      v-bind="{order: orderIds}" />
  </PdkModal>
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent} from 'vue';
import {get} from '@vueuse/core';
import {instantiateActions} from '../../services/instantiateActions';
import {usePluginSettings} from '../../composables/context/usePluginSettings';
import {useOrdersData} from '../../composables/orders/useOrdersData';
import {modalCloseAction} from '../../actions/definitions/modal';
import {
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersUpdateAction,
} from '../../actions/definitions/orders';
import {AdminModalKey} from '../../data/constants';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentOptionsModalForm = defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue'));

const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.order;

const ordersData = computed(() => useOrdersData());

const orderIds = computed(() => get(ordersData).map((data) => get(data.order)?.externalIdentifier));

const actions = computed(() => {
  const disabled = get(ordersData).some((data) => get(data.query.isLoading));

  const actions = [
    modalCloseAction,
    ordersUpdateAction,
    ...(orderMode ? [orderExportAction] : [orderExportToShipmentsAction, ordersExportPrintShipmentsAction]),
  ];

  // TODO: figure out why this throws an error in build
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return instantiateActions(actions, {disabled});
});
</script>
