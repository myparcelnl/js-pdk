<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <ShipmentBulkSelectCheckbox
            v-model="bulk"
            :shipment-count="shipments?.length" />
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
      <OrderShipmentsTableRow
        v-for="shipment in shipments"
        :key="`row_${shipment.id}_${shipment.updated}`"
        v-model="bulk"
        :shipment-id="shipment.id" />
    </template>
  </PdkTable>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAdminConfig, useLanguage, useOrder, useOrderShipments} from '../../composables';
import OrderShipmentsTableRow from './OrderShipmentsTableRow.vue';
import ShipmentBulkSelectCheckbox from './ShipmentBulkSelectCheckbox.vue';
import {get} from '@vueuse/core';

const emit = defineEmits(['select']);

const query = useOrder();

const mutableSelectedRows = ref<string[]>([]);
const {translate} = useLanguage();

const selectedRows = computed({
  get(): string[] {
    return mutableSelectedRows.value;
  },
  set(rows: string[]): void {
    mutableSelectedRows.value = rows;
    emit('select', rows.map(Number));
  },
});

const bulk = ref([]);

const shipmentsQueries = computed(() => useOrderShipments(query));
const shipments = computed(() => shipmentsQueries.value.map((query) => get(query.data)));

const config = useAdminConfig();
</script>
