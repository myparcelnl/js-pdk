<template>
  <ConceptCard :order="query.data" />
  <ShipmentsCard :order="query.data" />
</template>

<script lang="ts" setup>
/**
 * The "MyParcel" card in the single order view.
 */
import ConceptCard from '../components/OrderCard/ConceptCard.vue';
import {EndpointName} from '@myparcel-pdk/common';
import ShipmentsCard from '../components/OrderCard/ShipmentsCard.vue';
import {useQueryStore} from '../stores';

const queryStore = useQueryStore();

queryStore.registerOrderQueries();

const query = queryStore.get(EndpointName.GET_ORDERS);
</script>
