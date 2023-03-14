<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <ShipmentBulkSelectCheckbox
            v-model="bulk"
            :shipment-count="query.data?.shipments.filter((item) => !item.deleted)?.length" />
        </PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_track_trace') }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_status') }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate('order_labels_column_last_update') }}</PdkTableCol>

        <PdkTableCol
          align="right"
          component="th">
          {{ translate('order_labels_column_actions') }}
        </PdkTableCol>
      </PdkTableRow>
    </template>

    <template #default>
      <PdkTableRow
        v-if="!query.data?.shipments.filter((item) => !item.deleted)"
        key="row_no_shipments">
        <PdkTableCol colspan="6">
          <div :class="config?.cssUtilities?.textCenter">
            <PdkIcon icon="warn" />
            {{ translate('no_shipments') }}
          </div>
        </PdkTableCol>
      </PdkTableRow>

      <ShipmentLabelTableRow
        v-for="shipment in query.data?.shipments.filter((item) => !item.deleted)"
        :key="`row_${shipment?.id}_${shipment.updated}`"
        v-model="bulk"
        :shipment="shipment" />
    </template>
  </PdkTable>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {useAdminConfig, useLanguage, useStoreQuery} from '../../composables';
import {BackendEndpoint} from '@myparcel-pdk/common/src';
import ShipmentBulkSelectCheckbox from './ShipmentBulkSelectCheckbox.vue';
import ShipmentLabelTableRow from './OrderShipmentsTableRow.vue';

export default defineComponent({
  name: 'OrderShipmentsTable',
  components: {
    ShipmentBulkSelectCheckbox,
    ShipmentLabelTableRow,
  },

  emits: ['select'],

  setup: (props, ctx) => {
    const query = useStoreQuery(BackendEndpoint.FetchOrders);

    const mutableSelectedRows = ref<string[]>([]);
    const {translate} = useLanguage();

    const selectedRows = computed({
      get(): string[] {
        return mutableSelectedRows.value;
      },
      set(rows: string[]): void {
        mutableSelectedRows.value = rows;
        ctx.emit('select', rows.map(Number));
      },
    });

    const bulk = ref([]);

    return {
      query,
      bulk,
      config: useAdminConfig(),
      selectedRows,
      translate,
    };
  },
});
</script>
