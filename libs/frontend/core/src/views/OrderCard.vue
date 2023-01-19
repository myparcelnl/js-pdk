<template>
  <ConceptCard :order="query.data" />

  <ShipmentsCard
    v-if="!orderMode"
    :order="query.data" />
</template>

<script lang="ts" setup>
/**
 * The "MyParcel" card in the single order views.
 */
import ConceptCard from '../components/OrderCard/ConceptCard.vue';
import {EndpointName} from '@myparcel-pdk/common';
import {defineAsyncComponent} from 'vue';
import {usePluginSettings} from '../composables';
import {useQueryStore} from '../stores';

const pluginSettings = usePluginSettings();
const queryStore = useQueryStore();

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentsCard = defineAsyncComponent(() => import('../components/OrderCard/ShipmentsCard.vue'));

queryStore.registerOrderQueries();

const query = queryStore.get(EndpointName.GET_ORDERS);
const {orderMode} = pluginSettings.general;
</script>
