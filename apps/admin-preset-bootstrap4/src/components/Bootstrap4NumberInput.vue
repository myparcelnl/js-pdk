<template>
  <input
    v-model="model"
    :disabled="disabled"
    type="number" />
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultNumberInput
 */
export default defineComponent({
  name: 'Bootstrap4NumberInput',

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
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => ({
    model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
  }),
});
</script>
