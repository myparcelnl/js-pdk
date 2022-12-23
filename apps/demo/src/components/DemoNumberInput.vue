<template>
  <PdkTextInput
    v-model="model"
    type="number"
    :min="min"
    :max="max"
    :disabled="disabled"
    :step="step" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * The component that is used to render a table row in a PdkTable.
 * @see import('@myparcel/pdk-components').DefaultNumberInput
 */
export default defineComponent({
  name: 'DemoNumberInput',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    max: {
      type: Number,
      default: null,
    },

    min: {
      type: Number,
      default: 0,
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Number,
      default: null,
    },

    step: {
      type: Number,
      default: 1,
    },
  },

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
