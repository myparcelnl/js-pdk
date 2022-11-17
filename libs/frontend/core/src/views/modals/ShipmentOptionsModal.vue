<template>
  <PdkModal
    :id="modalKey"
    :actions="actions"
    save-label="export"
    title="shipment_options_title">
    <template #default="data">
      <div
        v-if="data.state.opened === modalKey && modalStore.context"
        :key="modalStore.context">
        <ShipmentOptionsForm />

        <ShippingAddress :order-id="modalStore.context" />
      </div>
    </template>
  </PdkModal>
</template>

<script lang="ts">
import {ContextKey, ModalKey} from '../../types';
import {defineComponent, reactive} from 'vue';
import ShipmentOptionsForm from '../../components/ShipmentOptionsForm.vue';
import ShippingAddress from '../order-card/ShippingAddress.vue';
import {shipmentOptionsForm} from '../../pdk';
import {useExportOrder} from '../../composables';
import {useModalStore} from '../../stores';

/**
 * Shipment options modal. Opened by clicking the "Create" button in the "Labels" column in the orders list.
 */
export default defineComponent({
  name: 'ShipmentOptionsModal',
  components: {
    ShipmentOptionsForm,
    ShippingAddress,
  },

  setup: () => {
    const modalStore = useModalStore();
    const exportOrderQuery = useExportOrder();

    // const orderQuery = computed(() => {
    //   if (!modalStore.context || typeof modalStore.context !== 'string') {
    //     return;
    //   }
    //
    //   return useOrder(modalStore.context);
    // });

    const exportOrder = async (print = false): Promise<void> => {
      if (!modalStore.context) {
        return;
      }

      await exportOrderQuery.mutateAsync(
        {
          orderData: {
            externalIdentifier: modalStore.context as any,
          },
          print,
        },
        {
          onError(error) {
            console.log(error);
          },
          onSuccess() {
            modalStore.close();
          },
        },
      );
    };

    return {
      shipmentOptionsForm,
      modalKey: ModalKey.SHIPMENT_OPTIONS,
      contextKey: ContextKey.ORDER_DATA,
      modalStore,

      actions: reactive([
        {
          id: 'cancel',
          label: 'action_cancel',
          disabled: exportOrderQuery.isLoading,
        },
        {
          id: 'save',
          onClick: () => exportOrder(),
          disabled: exportOrderQuery.isLoading,
          label: 'action_export',
        },
        {
          id: 'save',
          onClick: () => exportOrder(true),
          disabled: exportOrderQuery.isLoading,
          label: 'action_export_print',
        },
      ]),
    };
  },
});
</script>
