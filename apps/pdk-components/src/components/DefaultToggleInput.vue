<template>
  <label>
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ translate(`toggle_${model ? 'yes' : 'no'}`) }}
    </label>
  </label>
</template>

<script lang="ts">
import {ElementInstance, generateFieldId, useTranslate} from '@myparcel/pdk-frontend';
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox. Needs an unique value.
 */
export default defineComponent({
  name: 'DefaultToggleInput',
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
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    return {
      id: generateFieldId(props.element),
      model: useVModel(props, 'modelValue', ctx.emit),
      translate: useTranslate(),
    };
  },
});
</script>
