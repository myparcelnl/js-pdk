<template>
  <select
    v-model="model"
    :class="{
      disabled: options.length === 1 || disabled,
    }"
    class="custom-select form-control">
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultSelectInput
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

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => {
    return {
      model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
    };
  },
});
</script>
