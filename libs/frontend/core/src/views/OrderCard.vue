<template>
  <PdkCard title="single_order_card_title">
    <template #default>
      <ConceptCard :order="query.data" />
      <ShipmentsCard :order="query.data" />
    </template>
  </PdkCard>
</template>

<script lang="ts" setup>
/**
 * The "MyParcel" card in the single order view.
 */
import ConceptCard from '../components/order-card/ConceptCard.vue';
import ShipmentsCard from '../components/order-card/ShipmentsCard.vue';
import {useQueryStore} from '../stores';
import {EndpointName} from '@myparcel-pdk/common';

const queryStore = useQueryStore();

queryStore.registerOrderQueries();

queryStore.registerOrderQueries();

const query = queryStore.get(EndpointName.GET_ORDERS);
</script>
