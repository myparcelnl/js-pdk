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
import {useOrderMode, useOrdersData} from '../../composables';
import {modalCloseAction, MODAL_MODE_ACTIONS, ordersUpdateAction} from '../../actions';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentOptionsModalForm = defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue'));

const orderMode = useOrderMode();

const ordersData = computed(() => useOrdersData());

const orderIds = computed(() => toValue(ordersData).map((data) => toValue(data.order)?.externalIdentifier));

const actions = computed(() => {
  const disabled = toValue(ordersData).some((data) => toValue(data.query.isLoading));

  // @ts-expect-error instantiateActions overload does not accept the union of single/array parameter types
  return instantiateActions([modalCloseAction, ordersUpdateAction, ...MODAL_MODE_ACTIONS[orderMode]], {disabled});
});
</script>
