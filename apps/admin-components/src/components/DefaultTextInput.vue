<template>
  <input
    :id="id"
    v-model="model"
    :disabled="element.isDisabled || element.isSuspended" />
</template>

<script setup lang="ts">
import {
  DEFAULT_VALUE_EMIT,
  DEFAULT_VALUE_PROP,
  ElementInstance,
  generateFieldId,
} from '@myparcel-pdk/frontend-core/src';
import {PropType, defineEmits, defineProps} from 'vue';
import {useVModel} from '@vueuse/core';

const props = defineProps({
  element: {
    type: Object as PropType<ElementInstance>,
    required: true,
  },

  // eslint-disable-next-line vue/no-unused-properties
  modelValue: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits([DEFAULT_VALUE_EMIT]);

const model = useVModel(props, DEFAULT_VALUE_PROP, emit);
const id = generateFieldId(props.element);
</script>
