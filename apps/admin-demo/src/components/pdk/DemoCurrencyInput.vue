<template>
  <PdkNumberInput
    v-model="model"
    :element="element"
    :min="0"
    :step="0.01" />
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP, ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultCurrencyInput
 */
export default defineComponent({
  name: 'DemoCurrencyInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, {emit}) => ({
    model: useVModel(props, DEFAULT_VALUE_PROP, emit),
  }),
});
</script>
