<template>
  <div
    v-if="!query.isLoading"
    v-test>
    <OrderModeActions
      v-if="orderMode"
      :order="query.data" />

    <template v-else>
      <ShipmentLabels
        v-if="!orderMode"
        :order="query.data" />

      <OrderActions :order="query.data" />
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
const ShipmentLabels = defineAsyncComponent(() => import('../components/OrderListItem/ShipmentLabels.vue'));
const OrderModeActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderModeActions.vue'));
const OrderActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderActions.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

const queryStore = useQueryStore();

queryStore.registerOrderQueries();
const pluginSettings = usePluginSettings();
const {orderMode} = pluginSettings.general;

const query = queryStore.get(EndpointName.FETCH_ORDERS);
</script>
