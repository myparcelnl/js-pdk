<template>
  <div>
    <input
      :id="`radio_${value}`"
      v-model="model"
      :disabled="disabled"
      :value="value"
      type="radio" />
    <label
      :for="`radio_${value}`"
      v-text="translate(label)" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 */
export default defineComponent({
  name: 'DefaultMultiRadio',
  props: {
    /**
     * Controls the disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The label of the radio button.
     */
    label: {
      type: String,
      default: null,
    },

    /**
     * The value of the radio button.
     */
    value: {
      type: String,
      default: '1',
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  setup(props, ctx) {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      translate: useTranslate(),
      model,
    };
  },
});
</script>
