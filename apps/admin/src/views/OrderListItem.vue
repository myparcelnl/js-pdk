<template>
  <div v-if="!query.isLoading">
    <OrderModeOrderListItem v-if="orderMode" />

    <ShipmentModeOrderListItem v-else />
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
import {type NotificationFilter} from '../types';
import {useActionStore, useQueryStore} from '../stores';
import {NotificationCategory} from '../data';
import {useOrderData, usePluginSettings} from '../composables';
import {NotificationContainer} from '../components';

/* eslint-disable @typescript-eslint/naming-convention */
const OrderModeOrderListItem = defineAsyncComponent(() => {
  return import('../components/OrderListItem/OrderModeOrderListItem.vue');
});

const ShipmentModeOrderListItem = defineAsyncComponent(() => {
  return import('../components/OrderListItem/ShipmentModeOrderListItem.vue');
});
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
