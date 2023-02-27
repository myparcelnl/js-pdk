<template>
  <PdkTextInput
    v-model="model"
    :element="element"
    type="time" />
</template>

<script lang="ts" setup>
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);
</script>
