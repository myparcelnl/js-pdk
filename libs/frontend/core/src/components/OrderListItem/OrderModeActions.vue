<template>
  <PdkButtonGroup>
    <template v-if="order.exported">
      <PdkLink :action="showExportedOrderAction" />
    </template>

    <template v-else>
      <ActionButton
        :loading="loading"
        hide-text
        :action="editAction" />

      <ActionButton
        :loading="loading"
        hide-text
        :action="exportAction" />
    </template>
  </PdkButtonGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {orderExportAction, orderViewInBackofficeAction, ordersEditAction} from '../../actions';
import {ActionButton} from '../common';
import {Plugin} from '@myparcel-pdk/common';
import {createAction} from '../../services';
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
      editAction: createAction(ordersEditAction, {orderIds: props.order.externalIdentifier}, actionCallbacks),
      exportAction: createAction(orderExportAction, {orderIds: [props.order.externalIdentifier]}, actionCallbacks),
    };
  },
});
</script>
