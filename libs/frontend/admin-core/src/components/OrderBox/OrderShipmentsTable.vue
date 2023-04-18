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
        v-for="shipment in query.data.shipments"
        :key="`row_${shipment.id}_${shipment.updated}`"
        v-model="bulkModel[shipment.id]"
        :shipment-id="shipment.id" />
    </template>
  </PdkTable>
</template>

<script setup lang="ts">
import {useBulkSelectCheckbox, useLanguage, useOrder} from '../../composables';
import {BulkSelectCheckbox} from '../common';
import {Keyable} from '@myparcel-pdk/common/src';
import OrderShipmentsTableRow from './OrderShipmentsTableRow.vue';

const emit = defineEmits<(event: 'select', value: Record<Keyable, boolean>) => void>();

const query = useOrder();

const {bulkModel, bulkOptions} = useBulkSelectCheckbox(query?.data?.shipments?.map(({id}) => id) ?? [], emit);

const {translate} = useLanguage();
</script>
