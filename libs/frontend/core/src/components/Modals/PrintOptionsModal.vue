<template>
  <PdkModal
    :modal-key="modalKey"
    title="print_options_title">
    <PrintOptionsModalForm />
  </PdkModal>
</template>

<script setup lang="ts">
/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */

import {AdminModalKey} from '../../types';
import {defineAsyncComponent} from 'vue';

const modalKey = AdminModalKey.PrintOptions;

// eslint-disable-next-line @typescript-eslint/naming-convention
const PrintOptionsModalForm = defineAsyncComponent(() => import('./PrintOptionsModalForm.vue'));
</script>
