<template>
  <input
    :id="id"
    v-model.trim="model"
    :disabled="element.isDisabled || element.isSuspended" />
</template>

<script setup lang="ts">
import {ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-admin-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
