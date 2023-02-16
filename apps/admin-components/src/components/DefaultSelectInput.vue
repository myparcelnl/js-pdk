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
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
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

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    const model = useVModel(props, DEFAULT_VALUE_PROP, ctx.emit);

    return {model};
  },
});
</script>
