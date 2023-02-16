<template>
  <input
    :id="id"
    v-model="model"
    :disabled="element.isDisabled || element.isSuspended"
    :type="element.props?.type ?? 'text'"
    class="border px-3 py-2 rounded" />
</template>

<script lang="ts">
import {
  DEFAULT_VALUE_EMIT,
  DEFAULT_VALUE_PROP,
  ElementInstance,
  generateFieldId,
} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A text input.
 * @see import('@myparcel-pdk/admin-components').DefaultTextInput
 */
export default defineComponent({
  name: 'DemoTextInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    return {
      model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
      id: generateFieldId(props.element),
    };
  },
});
</script>
