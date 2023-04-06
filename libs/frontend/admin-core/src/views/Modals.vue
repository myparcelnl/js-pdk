<template>
  <div v-test="'Modals'">
    <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    <ShipmentOptionsModal />
  </div>
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {defineAsyncComponent} from 'vue';
import {usePluginSettings} from '../composables';

/* eslint-disable @typescript-eslint/naming-convention */
const PrintOptionsModal = defineAsyncComponent(() => import('../components/Modals/PrintOptionsModal.vue'));
// const ReturnsFormModal = defineAsyncComponent(() => import('../components/Modals/ReturnsFormModal.vue'));
const ShipmentOptionsModal = defineAsyncComponent(() => import('../components/Modals/ShipmentOptionsModal.vue'));
/* eslint-enable @typescript-eslint/naming-convention */

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
</script>
