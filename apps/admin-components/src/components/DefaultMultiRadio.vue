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
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP, useLanguage} from '@myparcel-pdk/frontend-core/src';
import {defineComponent} from 'vue';
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

  emits: [DEFAULT_VALUE_EMIT],

  setup(props, ctx) {
    const {translate} = useLanguage();

    return {
      model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
      translate,
    };
  },
});
</script>
