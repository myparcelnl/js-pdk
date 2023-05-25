<template>
  <PdkTextArea
    v-model.trim="model"
    :element="element" />
</template>

<script lang="ts" setup>
import {ElementInstance} from '@myparcel-pdk/frontend-admin-core';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);
</script>
