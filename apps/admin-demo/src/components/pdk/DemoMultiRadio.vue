<template>
  <PdkRadioInput
    v-for="option in options"
    :key="option.value"
    v-model="model"
    :disabled="option.disabled ?? disabled"
    v-bind="option" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useLanguage} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

/**
 * A single radio button.
 *
 * @see import('@myparcel-pdk/admin-components').DefaultMultiRadio
 * @see import('@myparcel-pdk/admin-components').DefaultMultiRadio
 */
export default defineComponent({
  name: 'DemoMultiRadio',
  props: {
    /**
     * Controls the disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The options of the radio buttons.
     */
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Array,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  setup(props, ctx) {
    const {translate} = useLanguage();

    return {
      translate,
      model: useVModel(props, 'modelValue', ctx.emit),
    };
  },
});
</script>
