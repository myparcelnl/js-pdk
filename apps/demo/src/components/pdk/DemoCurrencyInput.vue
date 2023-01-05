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
 * @see import('@myparcel/pdk-components').DefaultCurrencyInput
 */
export default defineComponent({
  name: 'DemoCurrencyInput',
  props: {
    disabled: {
      type: Boolean,
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
