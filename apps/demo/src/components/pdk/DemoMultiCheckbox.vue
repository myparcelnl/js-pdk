<template>
  <PdkCheckboxInput
    v-for="(option, index) in options"
    :key="`${option.value}_${index}`"
    v-model="model"
    :disabled="option.disabled || disabled"
    :label="option.label"
    :value="option.value" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox group. Renders a list of checkboxes which each have their own value.
 *
 * @see import('@myparcel/pdk-components').DefaultMultiCheckbox
 * @see import('@myparcel/pdk-components').DefaultMultiCheckbox
 */
export default defineComponent({
  name: 'DemoMultiCheckbox',
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
      default: () => [],
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
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
