<template>
  <PdkCard :actions="actions">
    <template #header>
      <span
        class="mr-2"
        v-text="`${translate('concept')} #${order?.externalIdentifier}`" />
    </template>

    <template #default>
      <div>
        <div>
          <ShipmentOptionsForm />
        </div>

        <div>
          <ShippingAddress />
        </div>
      </div>
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {PdkAction, orderExportAction, orderExportPrintAction, useOrderQuery, useTranslate} from '../../';
import {computed, defineComponent} from 'vue';
import ShipmentOptionsForm from '../../components/ShipmentOptionsForm.vue';
import ShippingAddress from './ShippingAddress.vue';
import {createActions} from '../modals/createActions';

export default defineComponent({
  name: 'ConceptCard',
  components: {
    ShipmentOptionsForm,
    ShippingAddress,
  },

  setup: () => {
    const order = computed(() => {
      return useOrderQuery().data.value;
    });

    return {
      order,
      translate: useTranslate(),

      actions: createActions([
        {
          action: PdkAction.ORDER_UPDATE,
          label: 'action_save',
          icon: 'save',
        },
        {
          ...orderExportAction,
          icon: 'add',
          label: 'action_new_shipment',
        },
        {
          ...orderExportPrintAction,
          icon: 'print',
          label: 'action_new_shipment_and_print',
        },
      ]),
    };
  },
});
</script>
