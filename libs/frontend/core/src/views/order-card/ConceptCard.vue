<template>
  <PdkCard :loading="loading">
    <template #header>
      <span
        class="mr-2"
        v-text="translate('concept')" />
    </template>

    <template #default>
      <div class="sm:flex">
        <div class="sm:w-1/2">
          <ShipmentOptionsForm />
        </div>

        <div class="sm:w-1/2">
          <ShippingAddress />
        </div>
      </div>
    </template>

    <template #footer>
      <PdkButton
        icon="save"
        @click="saveDeliveryOptions" />

      <div class="flex-fill" />

      <div class="gap-2 grid-flow-col inline-grid">
        <PdkButton
          icon="add"
          label="action_new_shipment"
          variant="outline-primary"
          @click="exportOrderQuery" />
        <PdkButton
          :icon="['add', 'local_printshop']"
          variant="outline-primary"
          @click="() => exportOrderQuery(true)">
          {{ translate('action_new_shipment_print') }}
        </PdkButton>
      </div>
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {PdkAction} from '../../data';
import ShipmentOptionsForm from '../../components/ShipmentOptionsForm.vue';
import ShippingAddress from './ShippingAddress.vue';
import {defineComponent} from 'vue';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ConceptCard',
  components: {
    ShipmentOptionsForm,
    ShippingAddress,
  },

  setup: () => {
    return {
      translate: useTranslate(),

      saveDeliveryOptions: async (): Promise<void> => {
        // await useDeliveryOptionsEventBus().saveConfiguration();
      },

      exportOrderQuery: async (print = false): Promise<void> => {
        const action = print ? PdkAction.ORDER_EXPORT_PRINT : PdkAction.ORDER_EXPORT;

        // await executeOrderAction(action);
      },
    };
  },
});
</script>
