<template>
  <PdkNumberInput
    v-model.number="model"
    v-test="AdminComponent.NumberInput"
    :element="element"
    :step="0.01" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {type ElementInstance} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: number) => void>();

const model = useVModel(props, undefined, emit);
</script>
