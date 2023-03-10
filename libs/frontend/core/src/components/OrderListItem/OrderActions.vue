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
import {AnyAdminAction} from '../../types';
import {Plugin} from '@myparcel-pdk/common/src';
import {defineActions} from '../../services';
import {useLoading} from '../../composables';

export default defineComponent({
  name: 'OrderActions',

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    const {loading} = useLoading();
    const shipments = computed(() => props.order.shipments?.filter((item) => !item.deleted));

    return {
      loading,

      actions: computed(() => {
        const actions: AnyAdminAction[] = [];

        if (shipments.value?.length) {
          actions.push(orderExportAction);
          actions.push({...ordersPrintAction, standalone: true});
          actions.push(ordersEditAction, ordersFetchAction);
        } else {
          actions.push({...orderExportAction, standalone: true});
          actions.push(ordersExportPrintShipmentsAction, ordersEditAction);
        }

        return defineActions(actions, {orderIds: props.order.externalIdentifier});
      }),
    };
  },
});
</script>
