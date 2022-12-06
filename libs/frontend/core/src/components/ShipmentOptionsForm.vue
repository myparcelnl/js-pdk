<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts">
import {MagicForm} from '@myparcel/vue-form-builder';
import {createShipmentOptionsForm} from '../forms';
import {defineComponent} from 'vue';
import {useOrderQuery} from '../composables';

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
    const orderId =
      props.orderId ?? useOrderQuery().data.value?.externalIdentifier;

    if (!orderId) {
      throw new Error('Order ID is required.');
    }

    return {
      shipmentOptionsForm: createShipmentOptionsForm(orderId),
    };
  },
});
</script>
