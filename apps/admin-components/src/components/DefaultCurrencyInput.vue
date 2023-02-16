<template>
  <PdkNumberInput
    v-model="model"
    :disabled="disabled"
    :min="0"
    :step="0.01" />
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * The component that is used to render a table row in a PdkTable.
 */
export default defineComponent({
  name: 'DefaultCurrencyInput',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The value of the model.
     */
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
