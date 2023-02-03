<template>
  <ConceptCard :order="query.data" />

  <OrderShipmentsCard
    v-if="!orderMode"
    :order="query.data" />
</template>

<script lang="ts" setup>
import {usePluginSettings, useStoreQuery} from '../composables';
import ConceptCard from '../components/OrderCard/ConceptCard.vue';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAsyncComponent} from 'vue';
import {useQueryStore} from '../stores';

const pluginSettings = usePluginSettings();
const queryStore = useQueryStore();

// eslint-disable-next-line @typescript-eslint/naming-convention
const OrderShipmentsCard = defineAsyncComponent(() => import('../components/OrderCard/OrderShipmentsCard.vue'));

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const query = useStoreQuery(EndpointName.FETCH_ORDERS);
const {orderMode} = pluginSettings.general;
</script>
