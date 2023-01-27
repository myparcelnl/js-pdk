<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {orderExportAction, ordersEditAction, ordersExportPrintShipmentsAction, ordersPrintAction} from '../../actions';
import {useLoading, useOrderData} from '../../composables';
import {PdkAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common';

export default defineComponent({
  name: 'ShipmentActions',

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const orderData = useOrderData(props.order);
    const {loading} = useLoading();

    return {
      loading,

      actions: computed(() => {
        const actions: PdkAction[] = [];

        if (orderData.shipments.value?.length) {
          actions.push(orderExportAction);
          actions.push({...ordersPrintAction, standalone: true});
        } else {
          actions.push({...orderExportAction, standalone: true});
          actions.push({...ordersExportPrintShipmentsAction});
        }

        actions.push(ordersEditAction);

        return actions;
      }),

      shipments: orderData.shipments,
    };
  },
});
</script>
