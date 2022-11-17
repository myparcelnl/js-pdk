<template>
  <PdkCard>
    <template #header>
      <PdkIcon icon="local_shipping" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <ShipmentLabels @select="setSelectedLabels" />
    </template>

    <template #footer>
      <PdkDropdownButton
        :disabled="!selectedLabels.length"
        :options="bulkActionDropdownItems"
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
import {PdkAction, deleteAction, printAction, refreshAction} from '../../data';
import {defineComponent, ref} from 'vue';
import ShipmentLabels from './ShipmentLabels.vue';
import {useTranslate} from '../../composables';

export default defineComponent({
  name: 'ShipmentsCard',
  components: {ShipmentLabels},

  setup: () => {
    const selectedLabels = ref<number[]>([]);

    return {
      translate: useTranslate(),
      selectedLabels,

      setSelectedLabels(labels: number[]): void {
        selectedLabels.value = labels;
      },

      bulkActionDropdownItems: [refreshAction, printAction, deleteAction],

      async onBulkAction(action: PdkAction): Promise<void> {
        // await actions.execute(action);
      },
    };
  },
});
</script>
