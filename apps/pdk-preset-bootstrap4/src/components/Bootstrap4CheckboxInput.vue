<template>
  <div class="form-check">
    <input
      :id="`checkbox_${value}`"
      v-model="model"
      class="form-check-input"
      type="checkbox"
      :disabled="disabled"
      :value="value" />
    <label
      class="form-check-label"
      :for="`checkbox_${value}`"
      v-text="translate(label)">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useTranslate} from '@myparcel/pdk-frontend';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultCheckboxInput
 */
export default defineComponent({
  name: 'Bootstrap4CheckboxInput',

  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    value: {
      type: [Boolean, String, Number],
      default: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean, Array],
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    return {
      model: useVModel(props, 'modelValue', ctx.emit),
      translate: useTranslate(),
    };
  },
});
</script>
