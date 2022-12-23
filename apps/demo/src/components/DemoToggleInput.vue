<template>
  <label>
    <input
      :id="id"
      v-model="model"
      :disabled="disabled"
      :value="true"
      type="checkbox" />

    <label :for="id">
      {{ model ? labelYes : labelNo }}
    </label>
  </label>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {generateId} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * A checkbox. Needs an unique value.
 * @see import('@myparcel/pdk-components').DefaultToggleInput
 */
export default defineComponent({
  name: 'DemoToggleInput',
  props: {
    /**
     * Controls the disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * Label in the disabled state.
     */
    labelNo: {
      type: String,
      default: 'no',
    },

    /**
     * Label in the enabled state.
     */
    labelYes: {
      type: String,
      default: 'yes',
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
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      id: generateId(),
      model,
    };
  },
});
</script>
