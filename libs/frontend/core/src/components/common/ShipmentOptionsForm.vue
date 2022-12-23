<template>
  <MagicForm :form="shipmentOptionsForm" />
</template>

<script lang="ts">
import {PropType, defineComponent, toRaw} from 'vue';
import {MagicForm} from '@myparcel/vue-form-builder';
import {Plugin} from '@myparcel-pdk/common';
import {createShipmentOptionsForm} from '../../forms';

export default defineComponent({
  name: 'ShipmentOptionsForm',
  components: {
    MagicForm,
  },

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup(props) {
    return {
      shipmentOptionsForm: createShipmentOptionsForm(toRaw(props.order)),
    };
  },
});
</script>
