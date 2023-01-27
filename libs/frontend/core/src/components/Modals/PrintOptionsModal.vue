<template>
  <PdkModal
    :modal-key="modalKey"
    save-label="print"
    title="print_options_title">
    <PrintOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import {ModalKey} from '../../types';

/**
 * Modal with print options. Opened when any print action is executed, if the modal is enabled in the module settings.
 */
export default defineComponent({
  name: 'PrintOptionsModal',
  components: {
    PrintOptionsModalForm: defineAsyncComponent(() => import('./PrintOptionsModalForm.vue')),
  },

  // eslint-disable-next-line max-lines-per-function
  setup: () => {
    return {
      modalKey: ModalKey.PRINT_OPTIONS,
    };
  },
});
</script>
