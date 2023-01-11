<template>
  <div class="form-check">
    <input
      :id="`radio_${value}`"
      v-model="model"
      class="form-check-input"
      type="radio"
      :disabled="disabled"
      :value="value" />
    <label
      class="form-check-label"
      :for="`radio_${value}`"
      v-text="translate(label)">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '@myparcel/pdk-frontend';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultRadioInput
 */
export default defineComponent({
  name: 'Bootstrap4RadioInput',

  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: '',
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },

    value: {
      type: [String, Number],
      required: true,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => ({
    translate: useTranslate(),
    model: useVModel(props, 'modelValue', ctx.emit),
  }),
});
</script>
