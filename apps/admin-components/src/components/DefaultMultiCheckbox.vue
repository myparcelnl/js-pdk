<template>
  <PdkCheckboxInput
    v-for="(option, index) in element.props?.options ?? []"
    :key="`${option.value}_${index}`"
    v-model="model"
    :disabled="option.disabled || element.isDisabled || element.isSuspended"
    :label="option.label"
    :value="option.value" />
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP, ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox group. Renders a list of checkboxes which each have their own value.
 */
export default defineComponent({
  name: 'DefaultMultiCheckbox',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: null,
    },
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    return {
      model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
    };
  },
});
</script>
