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
import {PropType, defineComponent} from 'vue';
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';
import {ActionButton} from '../common';
import {Plugin} from '@myparcel-pdk/common/src';
import {defineActions} from '../../services';

export default defineComponent({
  name: 'OrderModeActions',
  components: {
    ActionButton,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: (props) => {
    return {
      showExportedOrderAction: defineActions(orderViewInBackofficeAction),
      orderActions: defineActions([ordersEditAction, orderExportAction], {orderIds: props.order.externalIdentifier}),
    };
  },
});
</script>
