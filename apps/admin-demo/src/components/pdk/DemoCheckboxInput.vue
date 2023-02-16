<template>
  <label>
    {{ element.label }}
    <input
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value ?? true"
      type="checkbox" />
    <i />
  </label>
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP, ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultCheckboxInput
 */
export default defineComponent({
  name: 'DemoCheckboxInput',
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
    const model = useVModel(props, DEFAULT_VALUE_PROP, ctx.emit);

    return {
      model,
    };
  },
});
</script>
