<template>
  <PdkBox>
    <template #header>
      <PdkIcon icon="shipment" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <OrderShipmentsTable
        :order="order"
        @select="setSelectedLabels" />
    </template>

    <template #footer>
      <PdkDropdownButton
        :disabled="!selectedLabels.length"
        :actions="bulkActions">
        {{ translate('bulk_actions') }}
        <span
          v-if="selectedLabels.length"
          v-text="selectedLabels.length" />
      </PdkDropdownButton>
    </template>
  </PdkBox>
</template>

<script lang="ts">
import {PropType, defineComponent, ref} from 'vue';
import {
  shipmentsCreateReturnAction,
  shipmentsDeleteAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../../actions';
import OrderShipmentsTable from './OrderShipmentsTable.vue';
import {Plugin} from '@myparcel-pdk/common/src';
import {defineActions} from '../../services';
import {useLanguage} from '../../composables';

export default defineComponent({
  name: 'ShipmentTableBox',
  components: {
    OrderShipmentsTable,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const selectedLabels = ref<number[]>([]);
    const {translate} = useLanguage();

    return {
      selectedLabels,

      bulkActions: defineActions(
        [shipmentsFetchAction, shipmentsPrintAction, shipmentsDeleteAction, shipmentsCreateReturnAction],
        {
          orderIds: props.order.externalIdentifier,
          shipmentIds: selectedLabels.value,
        },
      ),

      setSelectedLabels(labels: number[]): void {
        selectedLabels.value = labels;
      },

      translate,
    };
  },
});
</script>
