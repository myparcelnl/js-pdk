<template>
  <PdkTextInput
    v-model="model"
    :disabled="disabled"
    :max="max"
    :min="min"
    :step="step"
    type="number" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * The component that is used to render a table row in a PdkTable.
 */
export default defineComponent({
  name: 'DefaultNumberInput',
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

  emits: ['update:modelValue'],

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
