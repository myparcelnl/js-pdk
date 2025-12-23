<template>
  <table class="table-fixed text-left w-full">
    <tr class="bg-green-900">
      <th class="p-4">Order ID</th>
      <th class="p-4">Recipient</th>
      <th class="p-4">Labels</th>
      <th class="p-4">Actions</th>
    </tr>

    <OrderRow
      v-for="(order, index) in orders"
      :key="`order_${order.externalIdentifier}`"
      :class="{'bg-gray-900': index % 2 !== 0}"
      :order="order" />
  </table>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {BackendEndpoint, type Plugin, useFetchOrdersQuery, useQueryStore, useStoreQuery} from '@myparcel-dev/pdk-admin';
import OrderRow from './OrderRow.vue';

const queryStore = useQueryStore();

queryStore.register(BackendEndpoint.FetchOrders, useFetchOrdersQuery());

const query = useStoreQuery(BackendEndpoint.FetchOrders);

const orders = computed(() => query.data) as Plugin.ModelPdkOrder[];
</script>
