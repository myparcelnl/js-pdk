<template>
  <PdkNumberInput
    v-model="model"
    :element="element"
    :min="0"
    :step="0.01" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
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

  emits: ['update:modelValue'],

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
