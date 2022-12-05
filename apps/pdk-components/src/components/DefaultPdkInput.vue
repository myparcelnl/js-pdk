<template>
  <input
    v-model="model"
    :disabled="disabled"
    :type="type"
    class="border px-3 py-2 rounded" />
  <span v-if="$attrs.currencySymbol">
    {{ $attrs.currencySymbol }}
  </span>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

/**
 * A text input.
 */
export default defineComponent({
  name: 'DefaultPdkInput',
  props: {
    /**
     * Controls disabled state.
     */
    disabled: {
      type: Boolean,
    },

    /**
     * ExportOrderInput type.
     */
    type: {
      type: String,
      default: 'text',
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

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {
      model,
    };
  },
});
</script>
