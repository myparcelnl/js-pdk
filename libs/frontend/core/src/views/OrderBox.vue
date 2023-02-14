<template>
  <ConceptBox :order="query.data" />

  <OrderShipmentsBox
    v-if="!orderMode"
    :order="query.data" />
</template>

<script lang="ts" setup>
import {usePluginSettings, useStoreQuery} from '../composables';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import ConceptBox from '../components/OrderBox/ConceptBox.vue';
import {defineAsyncComponent} from 'vue';
import {useQueryStore} from '../stores';

const pluginSettings = usePluginSettings();
const queryStore = useQueryStore();

// eslint-disable-next-line @typescript-eslint/naming-convention
const OrderShipmentsBox = defineAsyncComponent(() => import('../components/OrderBox/OrderShipmentsBox.vue'));

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const query = useStoreQuery(BackendEndpoint.FETCH_ORDERS);
const {orderMode} = pluginSettings.general;
</script>
