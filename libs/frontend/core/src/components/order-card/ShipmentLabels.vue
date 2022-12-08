<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <PdkCheckbox
            v-model="bulkCheckbox"
            :title="translate('select_all')"
            :disabled="!order.shipments.length" />
        </PdkTableCol>
        <PdkTableCol
          component="th"
          :title="translate('carrier')" />
        <PdkTableCol component="th">{{ translate('order_labels_column_track_trace') }} </PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_status') }}</PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_last_update') }}</PdkTableCol>
        <PdkTableCol
          class="text-right"
          component="th">
          {{ translate('order_labels_column_actions') }}
        </PdkTableCol>
      </PdkTableRow>
    </template>

    <template #default>
      <PdkTableRow
        v-if="!order.shipments.length"
        key="row_no_shipments">
        <PdkTableCol colspan="6">
          <div class="p-3 text-center">
            <PdkIcon icon="warn" />
            {{ translate('no_shipments') }}
          </div>
        </PdkTableCol>
      </PdkTableRow>

      <ShipmentLabel
        v-for="shipment in order.shipments"
        :key="`row_${shipment?.id}_${shipment.updated}`"
        v-model="selectedRows"
        :shipment="shipment" />
    </template>
  </PdkTable>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, ref} from 'vue';
import {usePdkConfig, useTranslate} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentLabel from './ShipmentLabel.vue';
import {isDef} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentLabels',
  components: {
    ShipmentLabel,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  emits: ['select'],

  setup: (props, ctx) => {
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

    const bulkCheckbox = computed({
      get(): boolean {
        return selectedRows.value.length === props.order?.shipments?.length;
      },

      set(bulkCheckboxChecked: boolean): void {
        const hasShipments = props.order && selectedRows.value.length !== props.order?.shipments?.length;
        const checked = bulkCheckboxChecked || hasShipments;
        const ids = (props.order?.shipments ?? []).map((shipment) => shipment.id?.toString());

        selectedRows.value = (checked ? ids ?? [] : []).filter(isDef);
      },
    });

    return {
      bulkCheckbox,
      pdkConfig: usePdkConfig(),
      selectedRows,
      translate: useTranslate(),
    };
  },
});
</script>
