<template>
  <input
    :id="id"
    v-model="model"
    :disabled="element.isDisabled || element.isSuspended"
    :type="element.props?.type ?? 'text'"
    class="border px-3 py-2 rounded" />
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {generateFieldId} from '@myparcel-pdk/frontend-core/src/utils/generateFieldId';
import {useVModel} from '@vueuse/core';

/**
 * A text input.
 * @see import('@myparcel/pdk-components').DefaultTextInput
 */
export default defineComponent({
  name: 'DemoTextInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  setup: (props, ctx) => {
    return {
      model: useVModel(props, 'modelValue', ctx.emit),
      id: generateFieldId(props.element),
    };
  },
});
</script>
