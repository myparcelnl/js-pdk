<template>
  <PdkTable
    v-test="$.type.__name"
    class="mb-0">
    <template #header>
      <PdkTableRow>
        <PdkTableCol component="th">
          <BulkSelectCheckbox
            v-model="bulkModel"
            :options="bulkOptions" />
        </PdkTableCol>

        <PdkTableCol component="th">{{ translate(`${translationPrefix}track_trace`) }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate(`${translationPrefix}status`) }}</PdkTableCol>

        <PdkTableCol component="th">{{ translate(`${translationPrefix}last_update`) }}</PdkTableCol>

        <PdkTableCol
          align="right"
          component="th">
          {{ translate(`${translationPrefix}actions`) }}
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
import {useLanguage} from '../../composables/language/useLanguage';
import {useOrderData} from '../../composables/orders/useOrderData';
import {type PdkBulkSelectCheckboxEmits, useBulkSelectCheckbox} from '../../composables/useBulkSelectCheckbox';
import OrderShipmentsTableRow from './OrderShipmentsTableRow.vue';

const emit = defineEmits<PdkBulkSelectCheckboxEmits>();

const {query} = useOrderData();
const data = computed(() => get(query.data));

const {bulkModel, bulkOptions} = useBulkSelectCheckbox(query.data.value?.shipments?.map(({id}) => id) ?? [], emit);

const {translate} = useLanguage();

const translationPrefix = 'order_labels_column_';
</script>
