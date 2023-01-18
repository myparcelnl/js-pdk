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
import {ModalKey, PdkIcon} from '../../types';
import {PropType, defineComponent} from 'vue';
import {createAction, createButtonAction} from '../../services';
import {orderEditAction, orderExportAction} from '../../actions';
import {ActionButton} from '../common';
import {Plugin} from '@myparcel-pdk/common';
import {useLoading} from '../../composables';

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
    const {loading, actionCallbacks} = useLoading();

    return {
      loading,
      showExportedOrderAction: createButtonAction({
        icon: PdkIcon.EXTERNAL,
        label: 'Show in MyParcel',
        id: 'show-exported-order',
        onClick: () => {
          window.open(`https://backoffice.myparcel.nl/orders`, '_blank');
        },
      }),

      editAction: createButtonAction(
        orderEditAction,
        ModalKey.SHIPMENT_OPTIONS,
        props.order.externalIdentifier,
        actionCallbacks,
      ),

      exportAction: createAction(orderExportAction, {orderIds: [props.order.externalIdentifier]}, actionCallbacks),
    };
  },
});
</script>
