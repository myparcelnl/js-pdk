<template>
  <PdkModal
    id="pdk-modal-printOptions"
    title="print_options_title">
    <!--    <PrintOptionsForm /> -->
  </PdkModal>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */
export default defineComponent({
  name: 'PrintOptionsModal',
});
</script>
