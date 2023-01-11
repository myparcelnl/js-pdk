<template>
  <input
    v-model="model"
    :disabled="disabled"
    :type="type" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A text input.
 */
export default defineComponent({
  name: 'DefaultTextInput',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * ExportOrdersInput type.
     */
    type: {
      type: String,
      default: 'text',
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
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
