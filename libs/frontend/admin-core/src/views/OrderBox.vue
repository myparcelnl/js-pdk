<template>
  <ShipmentOptionsBox />

  <ShipmentTableBox v-if="!orderMode && query.data?.shipments?.some((item) => !item.deleted)" />
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {useOrder, usePluginSettings} from '../composables';
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

const query = useOrder();
const {orderMode} = pluginSettings.general;
</script>
