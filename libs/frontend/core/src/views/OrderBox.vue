<template>
  <ShipmentOptionsBox :order="query.data" />

  <ShipmentTableBox
    v-if="!orderMode"
    :order="query.data" />
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {usePluginSettings, useStoreQuery} from '../composables';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import ShipmentOptionsBox from '../components/OrderBox/ShipmentOptionsBox.vue';
import {defineAsyncComponent} from 'vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentTableBox = defineAsyncComponent(() => import('../components/OrderBox/ShipmentTableBox.vue'));

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const actionStore = useActionStore();

actionStore.registerOrderActions();

const pluginSettings = usePluginSettings();

const query = useStoreQuery(BackendEndpoint.FETCH_ORDERS);
const {orderMode} = pluginSettings.general;
</script>
