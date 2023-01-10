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
import {PropType, UnwrapNestedRefs, defineComponent} from 'vue';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultCheckboxInput
 */
export default defineComponent({
  name: 'DemoCheckboxInput',
  props: {
    element: {
      type: Object as PropType<UnwrapNestedRefs<InteractiveElementInstance>>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
    };
  },
});
</script>
