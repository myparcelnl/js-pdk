<template>
  <div id="myparcel-pdk-modals">
    <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    <ShipmentOptionsModal />
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from 'vue';
import {usePluginSettings} from '../composables';

/* eslint-disable @typescript-eslint/naming-convention */
const PrintOptionsModal = defineAsyncComponent(() => import('../components/Modals/PrintOptionsModal.vue'));
// const ReturnsFormModal = defineAsyncComponent(() => import('../components/Modals/ReturnsFormModal.vue'));
const ShipmentOptionsModal = defineAsyncComponent(() => import('../components/Modals/ShipmentOptionsModal.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

const pluginSettings = usePluginSettings();
</script>
