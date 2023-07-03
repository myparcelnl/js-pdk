<template>
  <div v-test>
    <KeepAlive>
      <PrintOptionsModal v-if="pluginSettings.label.prompt" />
    </KeepAlive>

    <KeepAlive>
      <ShipmentOptionsModal v-if="modalOrder" />
    </KeepAlive>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useActionStore, useQueryStore} from '../stores';
import {useModalOrder, usePluginSettings} from '../composables';
import ShipmentOptionsModal from '../components/modals/ShipmentOptionsModal.vue';
import PrintOptionsModal from '../components/modals/PrintOptionsModal.vue';

useQueryStore().registerContextQueries();

useActionStore().registerModalActions();

const pluginSettings = usePluginSettings();
const modalOrder = computed(() => useModalOrder());
</script>
