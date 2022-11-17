<template>
  <PdkModal
    :context-key="contextKey.RETURNS_FORM"
    save-label="create"
    title="returns_form_title">
    <template #default="data">
      <ReturnsForm v-bind="data" />
    </template>
  </PdkModal>
</template>

<script lang="ts">
import {ContextKey} from '../../types';
import ReturnsForm from '../../components/ReturnsForm.vue';
import {defineComponent} from 'vue';

/**
 * Modal with a form to create itemA return shipment. Triggered by pressing "Create return label" on itemA label in the MyParcel
 * card in the single order view.
 */
export default defineComponent({
  name: 'ReturnsFormModal',
  components: {
    ReturnsForm,
  },

  setup: () => {
    return {
      contextKey: ContextKey,
    };
  },
});
</script>
