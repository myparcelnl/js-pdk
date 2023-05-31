<template>
  <ShipmentOptionsBox />

  <ShipmentTableBox v-if="!orderMode && data?.shipments?.some((item) => !item.deleted)" />
</template>

<script lang="ts" setup>
import {defineAsyncComponent, computed} from 'vue';
import {get} from '@vueuse/core';
import {useActionStore, useQueryStore} from '../stores';
import {useOrder, usePluginSettings} from '../composables';
import ShipmentOptionsBox from '../components/OrderBox/ShipmentOptionsBox.vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ShipmentTableBox = defineAsyncComponent(() => import('../components/OrderBox/ShipmentTableBox.vue'));

const queryStore = useQueryStore();

queryStore.registerContextQueries();
queryStore.registerOrderQueries();

const actionStore = useActionStore();

actionStore.registerOrderActions();

const pluginSettings = usePluginSettings();

const query = useOrder();
const data = computed(() => get(query.data));

const {orderMode} = pluginSettings.general;
</script>
