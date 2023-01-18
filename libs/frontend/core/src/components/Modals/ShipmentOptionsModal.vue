<template>
  <PdkModal
    :modal-key="modalKey"
    :actions="actions"
    save-label="export"
    title="shipment_options_title">
    <ShipmentOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import {
  modalCancelAction,
  orderExportAction,
  orderExportPrintShipmentsAction,
  orderExportShipmentsAction,
} from '../../actions';
import {EndpointName} from '@myparcel-pdk/common';
import {ModalKey} from '../../types';
import {createActions} from '../../services';
import {usePluginSettings} from '../../composables';
import {useQueryStore} from '../../stores';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */
export default defineComponent({
  name: 'ShipmentOptionsModal',
  components: {
    ShipmentOptionsModalForm: defineAsyncComponent(() => import('./ShipmentOptionsModalForm.vue')),
  },

  setup: () => {
    const pluginSettings = usePluginSettings();
    const {orderMode} = pluginSettings.general;

    const queryStore = useQueryStore();
    const exportOrdersQuery = queryStore.get(EndpointName.EXPORT_ORDERS);

    return {
      modalKey: ModalKey.SHIPMENT_OPTIONS,
      actions: createActions([
        {
          ...modalCancelAction,
          disabled: exportOrdersQuery.isLoading,
        },
        ...(orderMode ? [orderExportAction] : [orderExportShipmentsAction, orderExportPrintShipmentsAction]),
      ]),
    };
  },
});
</script>
