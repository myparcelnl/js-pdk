<template>
  <PdkTable class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <BulkSelectCheckbox
            v-model="bulkModel"
            :options="bulkOptions" />
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
        v-for="shipment in data?.shipments"
        :key="`row_${shipment.id}_${shipment.updated}`"
        v-model="bulkModel[shipment.id]"
        :shipment-id="shipment.id" />
    </template>
  </PdkTable>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {get} from '@vueuse/core';
import {BulkSelectCheckbox} from '../common';
import {useBulkSelectCheckbox, useLanguage, useOrder, type PdkBulkSelectCheckboxEmits} from '../../composables';
import OrderShipmentsTableRow from './OrderShipmentsTableRow.vue';

const emit = defineEmits<PdkBulkSelectCheckboxEmits>();

const query = useOrder();
const data = computed(() => get(query.data));

const {bulkModel, bulkOptions} = useBulkSelectCheckbox(query.data.value?.shipments?.map(({id}) => id) ?? [], emit);

const {translate} = useLanguage();
</script>
