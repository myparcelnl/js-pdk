<template>
  <div class="form-check">
    <input
      :id="`radio_${value}`"
      v-model="model"
      :disabled="disabled"
      :value="value"
      class="form-check-input"
      type="radio" />
    <label
      :for="`radio_${value}`"
      class="form-check-label"
      v-text="translate(label)">
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useLanguage} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultRadioInput
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

  setup: (props, ctx) => {
    const {translate} = useLanguage();

    return {
      model: useVModel(props, 'modelValue', ctx.emit),
      translate,
    };
  },
});
</script>
