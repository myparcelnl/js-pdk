<template>
  <input
    v-model="model"
    :disabled="disabled"
    :type="type"
    class="form-control" />
</template>

<script lang="ts">
import {DEFAULT_VALUE_EMIT, DEFAULT_VALUE_PROP} from '@myparcel-pdk/frontend-core/src';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * @see import('@myparcel-pdk/admin-components').DefaultTextInput
 */
export default defineComponent({
  name: 'Bootstrap4TextInput',

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
     * Input type.
     */
    type: {
      type: String,
      default: 'text',
    },
  },

  emits: [DEFAULT_VALUE_EMIT],

  setup: (props, ctx) => ({
    model: useVModel(props, DEFAULT_VALUE_PROP, ctx.emit),
  }),
});
</script>
