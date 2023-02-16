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
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core';
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox group. Renders a list of checkboxes which each have their own value.
 *
 * @see import('@myparcel-pdk/admin-components').DefaultMultiCheckbox
 * @see import('@myparcel-pdk/admin-components').DefaultMultiCheckbox
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

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    const model = useVModel(props, DEFAULT_VALUE_PROP, ctx.emit);

    return {
      model,
    };
  },
});
</script>
