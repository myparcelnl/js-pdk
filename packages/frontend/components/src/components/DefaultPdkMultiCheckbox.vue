<template>
  <PdkCheckbox
    v-for="(option, index) in options"
    :key="`${option.value}_${index}`"
    v-model="model"
    :label="option.label"
    :value="option.value" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'DefaultPdkMultiCheckbox',
  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
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
