<template>
  <PdkModal
    :actions="actions"
    :modal-key="modalKey"
    title="shipment_options_title">
    <ShipmentOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent} from 'vue';
import {
  modalCloseAction,
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersUpdateAction,
} from '../../actions';
import {usePluginSettings, useStoreQuery} from '../../composables';
import {AdminModalKey} from '../../types';
import {BACKEND_ENDPOINTS_ORDERS} from '@myparcel-pdk/common';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentOptionsModalForm = defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue'));

const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.general;

const orderQueries = BACKEND_ENDPOINTS_ORDERS.map((endpoint) => useStoreQuery(endpoint));

const modalKey = AdminModalKey.ShipmentOptions;

const actions = computed(() => {
  const disabled = orderQueries.some((query) => get(query.isLoading));

  const actions = [
    modalCloseAction,
    ordersUpdateAction,
    ...(orderMode ? [orderExportAction] : [orderExportToShipmentsAction, ordersExportPrintShipmentsAction]),
  ];

  return defineActions(actions, {disabled});
});
</script>
