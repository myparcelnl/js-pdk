<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <PdkCheckbox
            :checked="Boolean(shipments.length && selectedRows.length === shipments.length)"
            :disabled="!shipments.length"
            @change="selectAll" />
        </PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_track_trace') }}</PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_status') }}</PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_last_update') }}</PdkTableCol>
        <PdkTableCol
          class="text-right"
          component="th"
          >{{ translate('order_labels_column_actions') }}
        </PdkTableCol>
      </PdkTableRow>
    </template>

    <template #default>
      <PdkTableRow
        v-if="!shipments.length"
        key="tr_no_shipments">
        <PdkTableCol colspan="5">
          <div class="p-3 text-center">
            <PdkIcon icon="warning" />
            {{ translate('no_shipments') }}
          </div>
        </PdkTableCol>
      </PdkTableRow>

      <ShipmentLabel
        v-for="shipment in shipments"
        :key="`${shipment?.id}_${shipment.updated}`"
        v-model="selectedRows"
        :shipment="shipment" />
    </template>
  </PdkTable>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import ShipmentLabel from './ShipmentLabel.vue';
import {isDef} from '@vueuse/core';
import {useOrder} from '../../sdk';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ShipmentLabels',
  components: {
    ShipmentLabel,
  },

  setup: (props, ctx) => {
    const orderQuery = useOrder();
    const order = computed(() => orderQuery.data.value);
    const shipments = order.value?.shipments ?? [];

    const mutableSelectedRows = ref<string[]>([]);

    const selectedRows = computed({
      get(): string[] {
        return mutableSelectedRows.value;
      },
      set(rows: string[]): void {
        mutableSelectedRows.value = rows;
        ctx.emit('select', rows.map(Number));
      },
    });

    /**
     * Handles (de)selecting bulk checkboxes when clicking the checkbox in the table header.
     */
    const selectAll = (bulkCheckboxChecked: boolean): void => {
      const hasShipments = order.value && selectedRows.value.length !== order.value?.shipments?.length;

      selectedRows.value = (
        bulkCheckboxChecked || hasShipments
          ? (order.value?.shipments ?? []).map((shipment) => shipment.id?.toString()) ?? []
          : []
      ).filter(isDef);
    };

    const clearSelection = (): void => {
      selectedRows.value = [];
    };

    // useOrderActionsEventBus().on(EventName.RESPONSE, clearSelection);
    // useLabelActionsEventBus().on(EventName.RESPONSE, clearSelection);

    return {
      orderQuery,
      selectAll,
      selectedRows,
      shipments,
      translate: useTranslate(),
    };
  },
});
</script>
