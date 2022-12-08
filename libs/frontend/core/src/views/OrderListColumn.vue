<template>
  <div v-if="!query.isLoading">
    <ShipmentCards :order="query.data" />
    <OrderActions :order="query.data" />
  </div>
</template>

<script setup lang="ts">
/**
 * This is the main entry point for the order list column.
 */
import {OrderActions, ShipmentCards} from '../components/order-list-column';
import {EndpointName} from '@myparcel-pdk/common';
import {useQueryStore} from '../stores';

const queryStore = useQueryStore();

queryStore.registerOrderQueries();

const query = queryStore.get(EndpointName.GET_ORDERS);
</script>
