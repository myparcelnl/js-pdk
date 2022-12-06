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
import {computed, defineComponent} from 'vue';
import {
  orderExportAction,
  orderExportPrintAction,
  orderUpdateAction,
  useOrderQuery,
  useTranslate,
} from '../../';
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
        orderUpdateAction,
        orderExportAction,
        orderExportPrintAction,
      ]),
    };
  },
});
</script>
