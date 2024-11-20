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
import {computed, defineAsyncComponent, toValue} from 'vue';
import {instantiateActions} from '../../services';
import {AdminModalKey} from '../../data';
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

const {orderMode} = pluginSettings.order;

const ordersData = computed(() => useOrdersData());

const orderIds = computed(() => toValue(ordersData).map((data) => toValue(data.order)?.externalIdentifier));

const actions = computed(() => {
  const disabled = toValue(ordersData).some((data) => toValue(data.query.isLoading));

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
