<template>
  <PdkTextInput
    v-model="model"
    type="number"
    :element="element"
    :min="element.props?.min ?? 0"
    :max="element.props?.max ?? null"
    :step="element.props?.step ?? 1" />
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {useVModel} from '@vueuse/core';

/**
 * The component that is used to render a table row in a PdkTable.
 * @see import('@myparcel/pdk-components').DefaultNumberInput
 */
export default defineComponent({
  name: 'DemoNumberInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
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
