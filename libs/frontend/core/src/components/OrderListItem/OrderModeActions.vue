<template>
  <PdkButtonGroup v-test="'OrderModeActions'">
    <template v-if="order.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        v-for="action in orderActions"
        :key="action.id"
        hide-text
        :action="action" />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts">
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';
import {ActionButton} from '../common';
import {defineActions} from '../../services';
import {defineComponent} from 'vue';
import {get} from '@vueuse/core';
import {useOrder} from '../../composables/useOrder';

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
