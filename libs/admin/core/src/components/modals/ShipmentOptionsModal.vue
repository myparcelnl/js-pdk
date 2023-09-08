<template>
  <PdkModal
    v-test="$.type.__name"
    :actions="actions"
    :modal-key="AdminModalKey.ShipmentOptions"
    title="shipment_options_title">
    <ShipmentOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent} from 'vue';
import {get} from '@vueuse/core';
import {AdminModalKey} from '../../types';
import {useQueryStore} from '../../stores';
import {instantiateActions} from '../../services';
import {useOrdersData, usePluginSettings} from '../../composables';
import {
  modalCloseAction,
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
  ordersUpdateAction,
} from '../../actions';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentOptionsModalForm = defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue'));

const pluginSettings = usePluginSettings();
const queryStore = useQueryStore();

const {orderMode} = pluginSettings.order;

queryStore.registerOrderQueries();

const ordersData = useOrdersData();

const actions = computed(() => {
  const disabled = ordersData.some((data) => get(data.query.isLoading));

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
