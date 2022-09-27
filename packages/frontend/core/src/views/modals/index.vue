<template>
  <div id="myparcel-pdk-modals">
    <!--    <DeliveryOptionsModal v-if="showDeliveryOptionsModal" /> -->
    <!--    <PrintOptionsModal v-if="showPrintModal" /> -->
    <!--    <ReturnsFormModal v-if="showReturnsFormModal" /> -->
    <ShipmentOptionsModal v-if="showShipmentOptionsModal" />
    <!--    <AddCarrierModal v-if="showAddCarrierModal" /> -->
  </div>
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from 'vue';

export default defineComponent({
  name: 'Modals',
  components: {
    // AddCarrierModal,
    /* eslint-disable @typescript-eslint/naming-convention */
    // DeliveryOptionsModal: defineAsyncComponent(() => import('@/components/modals/DeliveryOptionsModal.vue')),
    // PrintOptionsModal: defineAsyncComponent(() => import('@/components/modals/PrintOptionsModal.vue')),
    // ReturnsFormModal: defineAsyncComponent(() => import('@/components/modals/ReturnsFormModal.vue')),
    ShipmentOptionsModal: defineAsyncComponent(async () => import('./ShipmentOptionsModal.vue')),
    /* eslint-enable @typescript-eslint/naming-convention */
  },

  setup: () => {
    return {
      // showAddCarrierModal: false,
      showDeliveryOptionsModal: true,
      // showPrintModal: pluginSettings.promptForLabelPosition,
      // showReturnsFormModal: true,
      showShipmentOptionsModal: true,
    };
  },
});
</script>
