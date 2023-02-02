<template>
  <div class="form-check">
    <input
      :id="`checkbox_${value}`"
      v-model="model"
      :disabled="disabled"
      :value="value"
      class="form-check-input"
      type="checkbox" />
    <label
      :for="`checkbox_${value}`"
      class="form-check-label"
      v-text="translate(label)">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useLanguage} from '@myparcel-pdk/admin';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultCheckboxInput
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
    const {translate} = useLanguage();

    return {
      model: useVModel(props, 'modelValue', ctx.emit),
      translate,
    };
  },
});
</script>
