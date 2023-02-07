<template>
  <label>
    {{ element.label }}
    <input
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props?.value"
      type="checkbox" />
    <i />
  </label>
</template>

<script lang="ts">
import {ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox. Needs an unique value.
 */
export default defineComponent({
  name: 'DefaultCheckboxInput',
  props: {
    element: {
      type: Object as PropType<ElementInstance>,
      required: true,
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    return {
      id: generateFieldId(props.element),
      model: useVModel(props, 'modelValue', ctx.emit),
    };
  },
});
</script>
