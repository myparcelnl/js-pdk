<template>
  <PdkModal
    :modal-key="modalKey"
    :actions="actions"
    title="shipment_options_title">
    <ShipmentOptionsModalForm />
  </PdkModal>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';
import {
  modalCancelAction,
  orderExportAction,
  orderExportToShipmentsAction,
  ordersExportPrintShipmentsAction,
} from '../../actions';
import {usePluginSettings, useStoreQuery} from '../../composables';
import {AdminModalKey} from '../../types';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
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
    const pluginSettings = usePluginSettings();
    const {orderMode} = pluginSettings.general;

    const exportOrdersQuery = useStoreQuery(BackendEndpoint.EXPORT_ORDERS);

    return {
      modalKey: AdminModalKey.SHIPMENT_OPTIONS,
      actions: createActions([
        {
          ...modalCancelAction,
          disabled: exportOrdersQuery.isLoading,
        },
        ...(orderMode ? [orderExportAction] : [orderExportToShipmentsAction, ordersExportPrintShipmentsAction]),
      ]),
    };
  },
});
</script>
