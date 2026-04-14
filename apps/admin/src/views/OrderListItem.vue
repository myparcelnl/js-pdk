<template>
  <div v-if="!query.isLoading">
    <OrderV2ModeOrderListItem v-if="orderMode === OrderMode.OrderV2" />

    <OrderModeOrderListItem v-else-if="orderMode === OrderMode.OrderV1" />

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
import {defineAsyncComponent, toValue} from 'vue';
import {type NotificationFilter} from '../types';
import {useActionStore, useQueryStore} from '../stores';
import {NotificationCategory, OrderMode} from '../data';
import {useOrderData, useOrderMode} from '../composables';
import {NotificationContainer} from '../components';

/* eslint-disable @typescript-eslint/naming-convention */
const OrderV2ModeOrderListItem = defineAsyncComponent(() => {
  return import('../components/OrderListItem/OrderV2ModeOrderListItem.vue');
});

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

const orderMode = useOrderMode();

const {query} = useOrderData();

const notificationFilter: NotificationFilter = (notification) => {
  return notification.tags?.orderIds === toValue(query.data)?.externalIdentifier;
};
</script>
