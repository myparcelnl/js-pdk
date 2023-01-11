<template>
  <select
    v-model="model"
    class="custom-select form-control"
    :class="{
      disabled: options.length === 1 || disabled,
    }">
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel/pdk-components').DefaultSelectInput
 */
export default defineComponent({
  name: 'Bootstrap4SelectInput',

  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * The value of the model.
     */
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },

    /**
     * The options of the select.
     */
    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): SelectOption[] => [],
    },
  },

  emits: ['update:modelValue'],

  setup: (props, ctx) => {
    return {
      model: useVModel(props, 'modelValue', ctx.emit),
    };
  },
});
</script>
