<template>
  <PdkNumberInput
    v-model="model"
    :min="0"
    :step="0.01"
    :disabled="disabled" />
</template>

<script lang="ts">
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

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
