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
import {useTranslate} from '@myparcel/pdk-frontend';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'DefaultPdkRadio',
  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    value: {
      type: String,
      default: '1',
    },

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
