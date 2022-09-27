<template>
  <PdkModal
    :on-save="onSave"
    context-key="deliveryOptions"
    title="delivery_options_title">
    <template #default="data">
      <DeliveryOptions v-bind="data" />
    </template>
  </PdkModal>
</template>

<script lang="ts">
import DeliveryOptions from '../order-card/DeliveryOptions.vue';
import {defineComponent} from 'vue';
import {useOrder} from '../../composables/query/orders/useOrder';

/**
 * Modal used in the single order view to edit delivery options for the order.
 */
export default defineComponent({
  name: 'DeliveryOptionsModal',
  components: {
    DeliveryOptions,
  },

  setup: () => {
    const onSave: ModalCallback = async () => {
      const orderQuery = useOrder();

      // Refresh global shipment options context
      if (orderQuery.data.value?.externalIdentifier) {
        // const response = await useOrderDataContextEventBus().refresh(order.value?.externalIdentifier);
        // order.value = response?.context;
      }
    };

    return {onSave};
  },
});
</script>
