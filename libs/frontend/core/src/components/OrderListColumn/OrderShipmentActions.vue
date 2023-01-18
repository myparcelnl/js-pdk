<template>
  <PdkButtonGroup>
    <ActionButton
      :action="editAction"
      :loading="loading" />

    <ActionButton
      v-if="order?.shipments.length"
      :loading="loading"
      :action="printAction" />
  </PdkButtonGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {createAction, createButtonAction} from '../../services';
import {orderEditAction, orderPrintAction} from '../../actions';
import {ActionButton} from '../common';
import {ModalKey} from '../../types';
import {Plugin} from '@myparcel-pdk/common';
import {useLoading} from '../../composables';

export default defineComponent({
  name: 'OrderShipmentActions',
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

      editAction: createButtonAction(
        orderEditAction,
        ModalKey.SHIPMENT_OPTIONS,
        props.order.externalIdentifier,
        actionCallbacks,
      ),

      printAction: createAction(orderPrintAction, {orderIds: [props.order.externalIdentifier]}, actionCallbacks),
    };
  },
});
</script>
