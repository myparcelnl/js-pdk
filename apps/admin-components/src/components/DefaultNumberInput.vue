<template>
  <PdkTextInput
    v-model.number="model"
    :element="element"
    type="number" />
</template>

<script lang="ts" setup>
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: number) => void>();

const model = useVModel(props, undefined, emit);
</script>
