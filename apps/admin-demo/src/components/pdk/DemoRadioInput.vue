<template>
  <PdkRadio
    v-for="option in element.props?.options ?? []"
    :id="id"
    :key="option.value"
    :disabled="element.isDisabled || element.isSuspended || option.disabled"
    v-bind="option" />
</template>

<script lang="ts">
import {ElementInstance, generateFieldId} from '@myparcel-pdk/admin';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 * @see import('@myparcel-pdk/admin-components').DefaultRadioInput
 */
export default defineComponent({
  name: 'DemoRadioInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => ({
    id: generateFieldId(props.element),
    model: useVModel(props, 'modelValue', ctx.emit),
  }),
});
</script>
