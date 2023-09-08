<template>
  <div v-if="!query.isLoading">
    <OrderModeActions v-if="orderMode" />

    <template v-else>
      <ShipmentLabels v-if="!orderMode" />

      <OrderActions />
    </template>
  </div>

  <NotificationContainer
    :category="NotificationCategory.Action"
    :filter="notificationFilter" />
</template>

<script lang="ts" setup>
/**
 * This is the main entry point for the order list column.
 */
import {defineAsyncComponent} from 'vue';
import {get} from '@vueuse/core';
import {NotificationCategory, type NotificationFilter} from '@myparcel-pdk/admin-common';
import {useActionStore, useQueryStore} from '../stores';
import {useOrderData, usePluginSettings} from '../composables';
import {NotificationContainer} from '../components';

/* eslint-disable @typescript-eslint/naming-convention */
const ShipmentLabels = defineAsyncComponent(() => import('../components/OrderListItem/ShipmentLabels.vue'));
const OrderModeActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderModeActions.vue'));
const OrderActions = defineAsyncComponent(() => import('../components/OrderListItem/OrderActions.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const actionStore = useActionStore();

actionStore.registerOrderActions();

const pluginSettings = usePluginSettings();

const {orderMode} = pluginSettings.order;

const {query} = useOrderData();

const notificationFilter: NotificationFilter = (notification) => {
  return notification.tags?.orderIds === get(query.data)?.externalIdentifier;
};
</script>
