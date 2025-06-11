<template>
  <div v-test>
    <KeepAlive>
      <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    </KeepAlive>

    <ShipmentOptionsModal />
  </div>
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {usePluginSettings} from '../composables';
import ShipmentOptionsModal from '../components/modals/ShipmentOptionsModal.vue';
import PrintOptionsModal from '../components/modals/PrintOptionsModal.vue';

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
</script>
