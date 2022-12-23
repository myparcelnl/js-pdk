<template>
  <PdkButtonGroup>
    <ActionButton
      :action="modalOpenAction"
      :title="`Create shipment for order ${order.externalIdentifier}`" />

    <ActionButton
      v-if="order?.shipments.length"
      :action="printAction" />
  </PdkButtonGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {createAction, createButtonAction} from '../../services';
import {modalOpenAction, orderPrintAction} from '../../actions';
import {ActionButton} from '../common';
import {ModalKey} from '../../types';
import {Plugin} from '@myparcel-pdk/common';
import {usePdkConfig} from '../../composables';

export default defineComponent({
  name: 'OrderActions',
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
      pdkConfig: usePdkConfig(),
      printAction: createAction(orderPrintAction, {orderIds: [props.order.externalIdentifier]}),
      modalOpenAction: createButtonAction(modalOpenAction, ModalKey.SHIPMENT_OPTIONS, props.order.externalIdentifier),
    };
  },
});
</script>
