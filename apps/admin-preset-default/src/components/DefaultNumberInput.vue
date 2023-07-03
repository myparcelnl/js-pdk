<template>
  <PdkTextInput
    v-model.number="model"
    v-test="AdminComponent.NumberInput"
    :element="element"
    type="number" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type ElementInstance} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: number) => void>();

const model = useVModel(props, undefined, emit);
</script>
