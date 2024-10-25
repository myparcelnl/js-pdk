<template>
  <ShipmentOptionsBox />

  <ShipmentTableBox v-if="!orderMode && data?.shipments?.some((item) => !item.deleted)" />
</template>

<script lang="ts" setup>
import {computed, defineAsyncComponent} from 'vue';
import {get} from '@vueuse/core';
import {useQueryStore} from '../stores/useQueryStore';
import {useActionStore} from '../stores/useActionStore';
import {useOrderData} from '../composables/orders/useOrderData';
import {usePluginSettings} from '../composables/context/usePluginSettings';
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

const data = computed(() => get(query.data));

const {orderMode} = pluginSettings.order;
</script>
