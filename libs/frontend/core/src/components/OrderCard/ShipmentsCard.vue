<template>
  <PdkCard :loading="loading">
    <template #header>
      <PdkIcon icon="local_shipping" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <ShipmentLabelsTable
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
import {PropType, defineComponent, ref} from 'vue';
import {deleteAction, shipmentPrintAction, shipmentRefreshAction} from '../../actions';
import {useLanguage, useLoading} from '../../composables';
import {Plugin} from '@myparcel-pdk/common';
import ShipmentLabelsTable from './ShipmentLabelsTable.vue';
import {createActions} from '../../services';

export default defineComponent({
  name: 'ShipmentsCard',
  components: {ShipmentLabelsTable},

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: () => {
    const selectedLabels = ref<number[]>([]);
    const {loading, setLoading} = useLoading();
    const {translate} = useLanguage();

    return {
      bulkActionDropdownItems: createActions(
        [shipmentRefreshAction, shipmentPrintAction, deleteAction],
        {
          shipmentIds: selectedLabels.value,
        },
        {
          start() {
            setLoading(true);
          },
          end() {
            setLoading(false);
          },
        },
      ),

      loading,

      selectedLabels,

      setSelectedLabels(labels: number[]): void {
        selectedLabels.value = labels;
      },

      translate,
    };
  },
});
</script>
