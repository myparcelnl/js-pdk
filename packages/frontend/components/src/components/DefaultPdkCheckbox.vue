<template>
  <div>
    <label>
      {{ label }}
      <input
        v-model="model"
        type="checkbox"
        :disabled="disabled"
        :value="value" />
      <i />
    </label>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'PdkCheckbox',
  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    value: {
      type: [String, Boolean],
      default: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Boolean],
      default: null,
    },
  },

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
    };
  },
});
</script>
