<template>
  <label>
    {{ label }}
    <input
      v-model="model"
      :disabled="disabled"
      :value="value"
      type="checkbox" />
    <i />
  </label>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultCheckboxInput
 */
export default defineComponent({
  name: 'DemoCheckboxInput',
  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    value: {
      type: [String, Boolean],
      default: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
    };
  },
});
</script>
