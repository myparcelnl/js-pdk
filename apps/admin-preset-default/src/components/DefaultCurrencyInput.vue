<template>
  <PdkNumberInput
    v-model.number="model"
    :element="element"
    :min="0"
    :step="0.01" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {type ElementInstance} from '@myparcel-pdk/frontend-admin-core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: number) => void>();

const model = useVModel(props, undefined, emit);
</script>
