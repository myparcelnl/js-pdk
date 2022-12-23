<template>
  <div id="myparcel-pdk-modals">
    <!--    <PrintOptionsModal v-if="showPrintModal" /> -->
    <!--    <ReturnsFormModal /> -->
    <ShipmentOptionsModal />
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from 'vue';

/* eslint-disable @typescript-eslint/naming-convention */
const ShipmentOptionsModal = defineAsyncComponent(() => import('../components/Modals/ShipmentOptionsModal.vue'));
// const ReturnsFormModal = defineAsyncComponent(() => import('../components/Modals/ReturnsFormModal.vue'));
// const PrintOptionsModal = defineAsyncComponent(() => import('../components/Modals/PrintOptionsModal.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

// const pluginSettings = usePluginSettings();

// const showPrintModal = pluginSettings.label.prompt;
</script>
