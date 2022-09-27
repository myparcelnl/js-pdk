<template>
  <pre v-text="options"></pre>

  <select
    v-model="model"
    :disabled="disabled"
    class="border flex-grow px-2 py-1 rounded">
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {SelectOption} from '@myparcel/pdk-frontend-shared';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'DefaultPdkSelect',
  props: {
    disabled: {
      type: Boolean,
    },

    options: {
      type: Array as PropType<SelectOption[]>,
      default: (): never[] => [],
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  setup: (props, ctx) => {
    const model = useVModel(props, 'modelValue', ctx.emit);

    return {model};
  },
});
</script>
