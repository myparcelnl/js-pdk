<template>
  <PdkFormGroup>
    <template #label>
      <slot>{{ translate(label) }}</slot>
    </template>
    <template #default>
      <PdkSelect
        v-model="model"
        :disabled="disabled"
        :options="options" />
    </template>
  </PdkFormGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useTranslate} from '../../../composables';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'SelectFormGroup',
  props: {
    disabled: {
      type: Boolean,
    },

    label: {
      type: String,
      default: null,
    },

    options: {
      type: Array as PropType<unknown[]>,
      default: (): never[] => [],
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  setup(props, {emit}) {
    const model = useVModel(props, 'modelValue', emit);

    return {
      model,
      translate: useTranslate(),
    };
  },
});
</script>
