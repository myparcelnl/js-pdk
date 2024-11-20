<template>
  <PdkBox v-test="[$.type.__name, order?.externalIdentifier]">
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

<script lang="ts" setup>
import {computed, ref, toRaw, toValue} from 'vue';
import {isDef} from '@vueuse/core';
import {instantiateActions} from '../../services';
import {AdminIcon} from '../../data';
import {useLanguage, useOrderData} from '../../composables';
import {shipmentActions} from '../../actions';
import OrderShipmentsTable from './OrderShipmentsTable.vue';

const {order} = useOrderData();

const selectedLabels = ref<(string | number)[]>([]);

const bulkActions = computed(() => {
  return instantiateActions(shipmentActions, {
    orderIds: toValue(order)?.externalIdentifier,
    shipmentIds: toRaw(selectedLabels.value),
  });
});

const setSelectedLabels = (labels: Record<string | number, boolean>): void => {
  selectedLabels.value = Object.keys(labels).filter((id) => isDef(labels[id]));
};

const {translate} = useLanguage();
</script>
