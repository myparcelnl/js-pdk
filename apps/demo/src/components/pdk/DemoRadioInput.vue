<template>
  <PdkRadio
    v-for="option in element.props?.options ?? []"
    :id="id"
    :key="option.value"
    :disabled="element.isDisabled || element.isSuspended || option.disabled"
    v-bind="option" />
</template>

<script lang="ts">
import {ElementInstance, generateFieldId, useTranslate} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 * @see import('@myparcel/pdk-components').DefaultRadioInput
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
    translate: useTranslate(),
  }),
});
</script>
