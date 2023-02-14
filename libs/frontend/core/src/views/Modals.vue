<template>
  <div v-test="'Modals'">
    <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    <ShipmentOptionsModal />
  </div>
</template>

<script lang="ts" setup>
import {defineAsyncComponent} from 'vue';
import {usePluginSettings} from '../composables';
import {useQueryStore} from '../stores';

/* eslint-disable @typescript-eslint/naming-convention */
const PrintOptionsModal = defineAsyncComponent(() => import('../components/Modals/PrintOptionsModal.vue'));
// const ReturnsFormModal = defineAsyncComponent(() => import('../components/Modals/ReturnsFormModal.vue'));
const ShipmentOptionsModal = defineAsyncComponent(() => import('../components/Modals/ShipmentOptionsModal.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

const queryStore = useQueryStore();
queryStore.registerContextQueries();

const pluginSettings = usePluginSettings();
</script>
