<template>
  <PdkDropdownButton :actions="actions" />
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {
  orderExportAction,
  ordersEditAction,
  ordersExportPrintShipmentsAction,
  ordersFetchAction,
  ordersPrintAction,
} from '../../actions';
import {useLoading, useOrderData} from '../../composables';
import {AnyAdminAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common/src';
import {createActions} from '../../services';

export default defineComponent({
  name: 'OrderActions',

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
        const actions: AnyAdminAction[] = [];

        if (orderData.shipments.value?.length) {
          actions.push(orderExportAction);
          actions.push({...ordersPrintAction, standalone: true});
          actions.push(ordersEditAction, ordersFetchAction);
        } else {
          actions.push({...orderExportAction, standalone: true});
          actions.push(ordersExportPrintShipmentsAction, ordersEditAction);
        }

        return createActions(actions, {orderIds: props.order.externalIdentifier});
      }),

      shipments: orderData.shipments,
    };
  },
});
</script>
