<template>
  <div v-test="'Modals'">
    <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    <ShipmentOptionsModal v-if="modalOrder" />
  </div>
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {useModalOrder, usePluginSettings} from '../composables';
import PrintOptionsModal from '../components/modals/PrintOptionsModal.vue';
import ShipmentOptionsModal from '../components/modals/ShipmentOptionsModal.vue';

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
const modalOrder = useModalOrder();
</script>
