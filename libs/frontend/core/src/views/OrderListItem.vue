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

  <NotificationContainer category="'api'" />
</template>

<script lang="ts" setup>
/**
 * This is the main entry point for the order list column.
 */
import {usePluginSettings, useStoreQuery} from '../composables';
import {EndpointName} from '@myparcel-pdk/common/src';
import {NotificationContainer} from '../components';
import {defineAsyncComponent} from 'vue';
import {useQueryStore} from '../stores';

/* eslint-disable @typescript-eslint/naming-convention */
const ShipmentLabels = defineAsyncComponent(() => import('../components/OrderListItem/ShipmentLabels.vue'));
const OrderModeActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderModeActions.vue'));
const OrderActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderActions.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const pluginSettings = usePluginSettings();
const {orderMode} = pluginSettings.general;

const query = useStoreQuery(EndpointName.FETCH_ORDERS);
</script>
