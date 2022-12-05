<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <PdkCheckbox
            v-model="bulkCheckbox"
            :disabled="!shipments.length" />
        </PdkTableCol>
        <PdkTableCol component="th">{{ translate('order_labels_column_track_trace') }}</PdkTableCol>
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
      <TransitionGroup :name="pdkConfig?.transitions?.shipmentRow">
        <PdkTableRow
          v-if="!shipments.length"
          key="row_no_shipments">
          <PdkTableCol colspan="5">
            <div class="p-3 text-center">
              <PdkIcon icon="warn" />
              {{ translate('no_shipments') }}
            </div>
          </PdkTableCol>
        </PdkTableRow>

        <ShipmentLabel
          v-for="shipment in shipments"
          :key="`row_${shipment?.id}_${shipment.updated}`"
          v-model="selectedRows"
          :shipment="shipment" />
      </TransitionGroup>
    </template>
  </PdkTable>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watchEffect} from 'vue';
import {useContextStore, useOrderQuery, usePdkConfig, useTranslate} from '../../';
import ShipmentLabel from './ShipmentLabel.vue';
import {isDef} from '@vueuse/core';

export default defineComponent({
  name: 'ShipmentLabels',
  components: {
    ShipmentLabel,
  },

  emits: ['select'],

  setup: (props, ctx) => {
    const query = useOrderQuery();
    const shipments = query.data.value?.shipments ?? [];
    const contextStore = useContextStore();

    watchEffect(() => {
      console.log('watchEffect 1', query.data.value);
      console.log(contextStore.context.orderData);
    });

    watchEffect(() => {
      console.log('watchEffect 2', contextStore.context.orderData);
      console.log(query.data.value);
    });

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

    // const clearSelection = (): void => {
    //   selectedRows.value = [];
    // };

    // useOrderActionsEventBus().on(EventName.RESPONSE, clearSelection);
    // useLabelActionsEventBus().on(EventName.RESPONSE, clearSelection);

    const bulkCheckbox = computed({
      get(): boolean {
        return selectedRows.value.length === query.data.value?.shipments?.length;
      },

      set(bulkCheckboxChecked: boolean): void {
        const hasShipments = query.data.value && selectedRows.value.length !== query.data.value?.shipments?.length;

        const checked = bulkCheckboxChecked || hasShipments;
        const ids = (query.data.value?.shipments ?? []).map((shipment) => {
          console.log({shipment});
          return shipment.id?.toString();
        });

        console.log({checked: checked, ids});
        selectedRows.value = (checked ? ids ?? [] : []).filter(isDef);
      },
    });

    return {
      bulkCheckbox,
      pdkConfig: usePdkConfig(),
      query: query,
      selectedRows,
      shipments,
      translate: useTranslate(),
    };
  },
});
</script>
