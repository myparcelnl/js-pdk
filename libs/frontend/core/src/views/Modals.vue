<template>
  <div id="myparcel-pdk-modals">
    <!--    <DeliveryOptionsModal /> -->
    <!--    <PrintOptionsModal v-if="showPrintModal" /> -->
    <!--    <ReturnsFormModal /> -->
    <ShipmentOptionsModal />
  </div>
</template>

<script setup lang="ts">
import {defineAsyncComponent} from 'vue';

/* eslint-disable @typescript-eslint/naming-convention */
const ShipmentOptionsModal = defineAsyncComponent(() => import('../components/modals/ShipmentOptionsModal.vue'));
// const ReturnsFormModal = defineAsyncComponent(() => import('../components/modals/ReturnsFormModal.vue'));
// const DeliveryOptionsModal = defineAsyncComponent(() => import('../components/modals/DeliveryOptionsModal.vue'));
// const PrintOptionsModal = defineAsyncComponent(() => import('../components/modals/PrintOptionsModal.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

// const pluginSettings = usePluginSettings();

// const showPrintModal = pluginSettings.label.prompt;
</script>
