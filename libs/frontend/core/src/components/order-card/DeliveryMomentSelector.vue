<template>
  <PdkButton
    :click-context="{orderIdentifier: order.externalIdentifier}"
    icon="create">
    {{ order.deliveryOptions?.carrier }} | {{ formatter.format('dateLong', order.deliveryOptions?.date) }}
  </PdkButton>
</template>

<script lang="ts">
import {Plugin, useFormatter} from '@myparcel-pdk/common';
import {PropType, defineComponent} from 'vue';

export default defineComponent({
  name: 'DeliveryMomentSelector',

  props: {
    order: {
      type: Object as PropType<Plugin.ModelPdkOrder>,
      required: true,
    },
  },

  setup: () => {
    return {
      formatter: useFormatter(),
    };
  },
});
</script>
