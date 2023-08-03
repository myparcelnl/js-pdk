<template>
  <PdkBox v-test="$.type.__name">
    <template #header>
      <PdkIcon :icon="AdminIcon.Shipment" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <OrderShipmentsTable @select="setSelectedLabels" />
    </template>

    <template #footer>
      <PdkDropdownButton
        :actions="bulkActions"
        :disabled="!selectedLabels.length">
        {{ translate('bulk_actions') }}

        <PdkBadge v-if="selectedLabels.length">
          {{ selectedLabels.length }}
        </PdkBadge>
      </PdkDropdownButton>
    </template>
  </PdkBox>
</template>

<script setup lang="ts">
import {computed, ref, toRaw} from 'vue';
import {get, isDef} from '@vueuse/core';
import {AdminIcon} from '../../types';
import {instantiateActions} from '../../services';
import {useLanguage, useOrderData} from '../../composables';
import {shipmentActions} from '../../actions';
import OrderShipmentsTable from './OrderShipmentsTable.vue';

const {query} = useOrderData();

const selectedLabels = ref<(string | number)[]>([]);

const bulkActions = computed(() => {
  return instantiateActions(shipmentActions, {
    orderIds: get(query.data)?.externalIdentifier,
    shipmentIds: toRaw(selectedLabels.value),
  });
});

const setSelectedLabels = (labels: Record<string | number, boolean>): void => {
  selectedLabels.value = Object.keys(labels).filter((id) => isDef(labels[id]));
};

const {translate} = useLanguage();
</script>
