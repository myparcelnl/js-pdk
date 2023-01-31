<template>
  <PdkButtonGroup>
    <template v-if="order.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        v-for="action in orderActions"
        :key="action.id"
        :loading="loading"
        hide-text
        :action="action" />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {createAction, createActions} from '../../services';
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';
import {ActionButton} from '../common';
import {Plugin} from '@myparcel-pdk/common';
import {useLoading} from '../../composables';

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
    const {loading, actionCallbacks} = useLoading();

    return {
      loading,
      showExportedOrderAction: createAction(orderViewInBackofficeAction),
      orderActions: createActions(
        [ordersEditAction, orderExportAction],
        {orderIds: props.order.externalIdentifier},
        actionCallbacks,
      ),
    };
  },
});
</script>
