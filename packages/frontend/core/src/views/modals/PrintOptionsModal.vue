<template>
  <PdkModal
    id="printOptions"
    title="print_options_title">
    <PrintOptionsForm />
  </PdkModal>
</template>

<script lang="ts">
import PrintOptionsForm from '../../components/forms/PrintOptionsForm.vue';
import {defineComponent} from 'vue';

/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */
export default defineComponent({
  name: 'PrintOptionsModal',
  components: {
    PrintOptionsForm,
  },
});
</script>
