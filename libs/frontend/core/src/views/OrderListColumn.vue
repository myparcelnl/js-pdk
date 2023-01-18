<template>
  <div v-if="!query.isLoading">
    <OrderActions
      v-if="orderMode"
      :order="query.data" />

    <template v-else>
      <ShipmentCards
        v-if="!orderMode"
        :order="query.data" />

      <OrderShipmentActions :order="query.data" />
    </template>
  </div>
</template>

<script setup lang="ts">
/**
 * This is the main entry point for the order list column.
 */
import {EndpointName} from '@myparcel-pdk/common';
import {defineAsyncComponent} from 'vue';
import {usePluginSettings} from '../composables';
import {useQueryStore} from '../stores';

/* eslint-disable @typescript-eslint/naming-convention */
const ShipmentCards = defineAsyncComponent(() => import('../components/OrderListColumn/ShipmentCards.vue'));
const OrderActions = defineAsyncComponent(() => import('../components/OrderListColumn/OrderActions.vue'));
const OrderShipmentActions = defineAsyncComponent(
  () => import('../components/OrderListColumn/OrderShipmentActions.vue'),
);
/* eslint-enable @typescript-eslint/naming-convention */

const queryStore = useQueryStore();

queryStore.registerOrderQueries();
const pluginSettings = usePluginSettings();
const {orderMode} = pluginSettings.general;

const query = queryStore.get(EndpointName.GET_ORDERS);
</script>
