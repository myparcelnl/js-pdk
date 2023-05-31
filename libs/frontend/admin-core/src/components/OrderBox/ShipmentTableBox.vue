<template>
  <PdkBox>
    <template #header>
      <PdkIcon icon="shipment" />
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

<script lang="ts">
import {computed, defineComponent, ref, toRaw} from 'vue';
import {get, isDef} from '@vueuse/core';
import {defineActions} from '../../services';
import {useLanguage, useOrder} from '../../composables';
import {shipmentActions} from '../../actions';
import OrderShipmentsTable from './OrderShipmentsTable.vue';

export default defineComponent({
  name: 'ShipmentTableBox',
  components: {
    OrderShipmentsTable,
  },

  setup: () => {
    const query = useOrder();

    const selectedLabels = ref<(string | number)[]>([]);
    const {translate} = useLanguage();

    return {
      query,
      selectedLabels,

      bulkActions: computed(() => {
        return defineActions(shipmentActions, {
          orderIds: get(query.data)?.externalIdentifier,
          shipmentIds: toRaw(selectedLabels.value),
        });
      }),

      setSelectedLabels(labels: Record<string | number, boolean>): void {
        selectedLabels.value = Object.keys(labels).filter((id) => isDef(labels[id]));
      },

      translate,
    };
  },
});
</script>
