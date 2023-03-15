<template>
  <PdkBox>
    <template #header>
      <PdkIcon icon="shipment" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <OrderShipmentsTable @select="setSelectedLabels" />
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
import {defineComponent, ref} from 'vue';
import {
  shipmentsExportReturnAction,
  shipmentsDeleteAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../../actions';
import OrderShipmentsTable from './OrderShipmentsTable.vue';
import {defineActions} from '../../services';
import {get} from '@vueuse/core';
import {useLanguage} from '../../composables';
import {useOrder} from '../../composables/useOrder';

export default defineComponent({
  name: 'ShipmentTableBox',
  components: {
    OrderShipmentsTable,
  },

  setup: () => {
    const query = useOrder();

    const selectedLabels = ref<number[]>([]);
    const {translate} = useLanguage();

    return {
      query,
      selectedLabels,

      bulkActions: defineActions(
        [shipmentsFetchAction, shipmentsPrintAction, shipmentsDeleteAction, shipmentsExportReturnAction],
        {
          orderIds: get(query.data)?.externalIdentifier,
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
