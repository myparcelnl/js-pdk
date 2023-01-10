<template>
  <PdkRadio
    v-for="option in element.props?.options ?? []"
    :id="id"
    :key="option.value"
    :disabled="element.isDisabled || element.isSuspended || option.disabled"
    v-bind="option" />
</template>

<script lang="ts">
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {generateFieldId, useTranslate} from '@myparcel-pdk/frontend-core';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 * @see import('@myparcel/pdk-components').DefaultRadioInput
 */
export default defineComponent({
  name: 'DemoRadioInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup: (props, ctx) => ({
    id: generateFieldId(props.element),
    model: useVModel(props, 'modelValue', ctx.emit),
    translate: useTranslate(),
  }),
});
</script>
