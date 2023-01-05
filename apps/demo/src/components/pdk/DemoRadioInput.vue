<template>
  <PdkRadio
    v-for="option in options"
    :key="option.value"
    :disabled="disabled || option.disabled"
    v-bind="option" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common';
import {useTranslate} from '@myparcel-pdk/frontend-core';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 * @see import('@myparcel/pdk-components').DefaultRadioInput
 */
export default defineComponent({
  name: 'DemoRadioInput',
  props: {
    disabled: {
      type: Boolean,
    },

    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
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
