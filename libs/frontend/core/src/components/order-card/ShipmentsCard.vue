<template>
  <PdkCard>
    <template #header>
      <PdkIcon icon="local_shipping" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <ShipmentLabels
        :order="order"
        @select="setSelectedLabels" />
    </template>

    <template #footer>
      <PdkDropdownButton
        :disabled="!selectedLabels.length"
        :actions="bulkActionDropdownItems"
        @click="onBulkAction">
        {{ translate('bulk_actions') }}
        <span
          v-if="selectedLabels.length"
          class="badge badge-dark ml-1"
          v-text="selectedLabels.length" />
      </PdkDropdownButton>
    </template>
  </PdkCard>
</template>

<script lang="ts">
import {FrontendAction, deleteAction, shipmentPrintAction, shipmentRefreshAction} from '../../data';
import {PropType, defineComponent, ref} from 'vue';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentLabels from './ShipmentLabels.vue';
import {doAction} from '../../utils';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ShipmentsCard',
  components: {ShipmentLabels},

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: () => {
    const selectedLabels = ref<number[]>([]);

    return {
      translate: useTranslate(),
      selectedLabels,

      setSelectedLabels(labels: number[]): void {
        selectedLabels.value = labels;
      },

      bulkActionDropdownItems: [shipmentRefreshAction, shipmentPrintAction, deleteAction],

      async onBulkAction<A extends FrontendAction.SHIPMENT_REFRESH>(action: A): Promise<void> {
        await doAction<A>(action, {shipmentIds: selectedLabels.value});
      },
    };
  },
});
</script>
