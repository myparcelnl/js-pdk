<template>
  <select
    v-model="model"
    :disabled="disabled">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled || disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common';
import {useVModel} from '@vueuse/core';

/**
 * A select box. Renders a list of options which each have their own value.
 */
export default defineComponent({
  name: 'DefaultSelectInput',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The options of the select.
     */
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {model};
  },
});
</script>
