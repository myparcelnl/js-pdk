<template>
  <PdkBox :loading="loading">
    <template #header>
      <PdkIcon icon="local_shipping" />
      {{ translate('order_labels_header') }}
    </template>

    <template #default>
      <OrderShipmentsTable
        :order="order"
        @select="setSelectedLabels" />
    </template>

    <template #footer>
      <PdkDropdownButton
        :disabled="!selectedLabels.length"
        :actions="bulkActions">
        {{ translate('bulk_actions') }}
        <span
          v-if="selectedLabels.length"
          v-text="selectedLabels.length" />
      </PdkDropdownButton>
    </template>
  </PdkBox>
</template>

<script lang="ts">
import {PropType, defineComponent, ref} from 'vue';
import {
  shipmentsCreateReturnAction,
  shipmentsDeleteAction,
  shipmentsFetchAction,
  shipmentsPrintAction,
} from '../../actions';
import {useLanguage, useLoading} from '../../composables';
import OrderShipmentsTable from './OrderShipmentsTable.vue';
import {Plugin} from '@myparcel-pdk/common/src';
import {createActions} from '../../services';

export default defineComponent({
  name: 'OrderShipmentsBox',
  components: {
    OrderShipmentsTable,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const selectedLabels = ref<number[]>([]);
    const {loading, actionCallbacks} = useLoading();
    const {translate} = useLanguage();

    return {
      loading,

      selectedLabels,

      bulkActions: createActions(
        [shipmentsFetchAction, shipmentsPrintAction, shipmentsDeleteAction, shipmentsCreateReturnAction],
        {
          orderIds: props.order.externalIdentifier,
          shipmentIds: selectedLabels.value,
        },
        actionCallbacks,
      ),

      setSelectedLabels(labels: number[]): void {
        selectedLabels.value = labels;
      },

      translate,
    };
  },
});
</script>
