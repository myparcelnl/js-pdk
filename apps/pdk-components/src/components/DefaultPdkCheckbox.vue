<template>
  <div>
    <label>
      {{ label }}
      <input
        v-model="model"
        :disabled="disabled"
        :value="value"
        type="checkbox" />
      <i />
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox. Needs an unique value.
 */
export default defineComponent({
  name: 'DefaultPdkCheckbox',
  props: {
    /**
     * Controls the disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The label of the checkbox.
     */
    label: {
      type: String,
      default: null,
    },

    /**
     * The value of the checkbox.
     */
    value: {
      type: [String, Boolean],
      default: true,
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
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
    };
  },
});
</script>
