<template>
  <PdkModal
    :modal-key="modalKey"
    :actions="actions"
    save-label="export"
    title="shipment_options_title">
    <template #default="{context: orderId}">
      <ShipmentOptionsForm
        v-if="orderId"
        :order-id="orderId" />
    </template>
  </PdkModal>
</template>

<script lang="ts">
import {
  ContextKey,
  ModalKey,
  ShipmentOptionsForm,
  modalCancelAction,
  orderExportAction,
  orderExportPrintAction,
} from '../../';
import {defineComponent, ref} from 'vue';
import {FormInstance} from '@myparcel/vue-form-builder';
import {createActions} from './createActions';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */
export default defineComponent({
  name: 'ShipmentOptionsModal',
  components: {
    ShipmentOptionsForm,
  },

  setup: () => {
    const form = ref<FormInstance | null>(null);

    return {
      shipmentOptionsForm: form,
      modalKey: ModalKey.SHIPMENT_OPTIONS,
      contextKey: ContextKey.ORDER_DATA,
      actions: createActions([
        {
          ...modalCancelAction,
          // disabled: exportOrderQuery.isLoading,
        },
        orderExportAction,
        orderExportPrintAction,

        // {
        //   id: 'save',
        //   disabled: exportOrderQuery.isLoading,
        //   label: 'action_export',
        //   onClick: () => exportOrders(),
        // },
        // {
        //   id: 'save',
        //   disabled: exportOrderQuery.isLoading,
        //   label: 'action_export_print',
        //   onClick: () => exportOrders(true),
        // },
      ]),
    };
  },
});
</script>
