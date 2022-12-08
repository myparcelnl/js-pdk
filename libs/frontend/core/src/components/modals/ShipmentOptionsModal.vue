<template>
  <PdkModal
    :modal-key="modalKey"
    :actions="actions"
    save-label="export"
    title="shipment_options_title">
    <template #default="{context: orderId}">
      <ShipmentOptionsModalForm
        v-if="orderId"
        :order-id="orderId" />
    </template>
  </PdkModal>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import {modalCancelAction, orderExportAction, orderExportPrintAction} from '../../data';
import {ModalKey} from '../../types';
import {createActions} from '../../services';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */
export default defineComponent({
  name: 'ShipmentOptionsModal',
  components: {
    ShipmentOptionsModalForm: defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue')),
  },

  setup: () => {
    return {
      modalKey: ModalKey.SHIPMENT_OPTIONS,
      actions: createActions([
        {
          ...modalCancelAction,
          // disabled: exportOrderQuery.isLoading,
        },
        orderExportAction,
        orderExportPrintAction,
      ]),
    };
  },
});
</script>
