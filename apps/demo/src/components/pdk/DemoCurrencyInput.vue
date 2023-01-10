<template>
  <PdkNumberInput
    v-model="model"
    :min="0"
    :step="0.01"
    :element="element" />
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultCurrencyInput
 */
export default defineComponent({
  name: 'DemoCurrencyInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Number,
      default: null,
    },
  },

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
