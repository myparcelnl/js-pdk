<template>
  <div v-test="'Modals'">
    <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    <ShipmentOptionsModal />
  </div>
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import PrintOptionsModal from '../components/modals/PrintOptionsModal.vue';
import ShipmentOptionsModal from '../components/modals/ShipmentOptionsModal.vue';
import {usePluginSettings} from '../composables';

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
</script>
