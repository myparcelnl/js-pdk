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
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
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

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, {emit}) => ({
    model: useVModel(props, DEFAULT_VALUE_PROP, emit),
  }),
});
</script>
