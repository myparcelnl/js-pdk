<template>
  <PdkButtonGroup v-test="'OrderModeActions'">
    <template v-if="order.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        v-for="action in orderActions"
        :key="action.id"
        :action="action"
        hide-text />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {get} from '@vueuse/core';
import {ActionButton} from '../common';
import {defineActions} from '../../services';
import {useOrder} from '../../composables';
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';

export default defineComponent({
  name: 'OrderModeActions',
  components: {
    ActionButton,
  },

  setup: () => {
    const query = useOrder();

    return {
      order: query.data,
      showExportedOrderAction: defineActions(orderViewInBackofficeAction),
      orderActions: defineActions([ordersEditAction, orderExportAction], {
        orderIds: get(query.data)?.externalIdentifier,
      }),
    };
  },
});
</script>
