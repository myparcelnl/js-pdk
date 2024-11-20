<template>
  <ShipmentOptionsBox />

  <ShipmentTableBox v-if="!orderMode && data?.shipments.some((item) => !item.deleted)" />
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent, toValue} from 'vue';
import {useActionStore, useQueryStore} from '../stores';
import {useOrderData, usePluginSettings} from '../composables';
import ShipmentOptionsBox from '../components/OrderBox/ShipmentOptionsBox.vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentTableBox = defineAsyncComponent(() => import('../components/OrderBox/ShipmentTableBox.vue'));

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const actionStore = useActionStore();

actionStore.registerOrderActions();

const pluginSettings = usePluginSettings();

const {query} = useOrderData();

const data = computed(() => toValue(query.data));

const {orderMode} = pluginSettings.order;
</script>
