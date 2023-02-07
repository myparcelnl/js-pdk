<template>
  <PdkTextInput
    v-model="model"
    :element="element"
    :max="element.props?.max ?? null"
    :min="element.props?.min ?? 0"
    :step="element.props?.step ?? 1"
    type="number" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

/**
 * The component that is used to render a table row in a PdkTable.
 * @see import('@myparcel-pdk/admin-components').DefaultNumberInput
 */
export default defineComponent({
  name: 'DemoNumberInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, {emit}) => ({
    model: useVModel(props, 'modelValue', emit),
  }),
});
</script>
