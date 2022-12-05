<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts">
import {createShipmentOptionsForm, useOrderQuery} from '../pdk';
import {MagicForm} from '@myparcel/vue-form-builder';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'ShipmentOptionsForm',
  components: {
    MagicForm,
  },

  props: {
    orderId: {
      type: String,
      default: null,
    },
  },

  setup(props) {
    const orderId = props.orderId ?? useOrderQuery().data.value?.externalIdentifier;

    if (!orderId) {
      throw new Error('Order ID is required.');
    }

    return {
      shipmentOptionsForm: createShipmentOptionsForm(orderId),
    };
  },
});
</script>
