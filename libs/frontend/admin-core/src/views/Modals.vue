<template>
  <div v-test="'Modals'">
    <KeepAlive>
      <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    </KeepAlive>

    <KeepAlive>
      <ShipmentOptionsModal v-if="modalOrder" />
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
import {useActionStore, useQueryStore} from '../stores';
import {useModalOrder, usePluginSettings} from '../composables';
import PrintOptionsModal from '../components/modals/PrintOptionsModal.vue';
import ShipmentOptionsModal from '../components/modals/ShipmentOptionsModal.vue';
import {computed} from 'vue';

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
const modalOrder = computed(() => useModalOrder());
</script>
