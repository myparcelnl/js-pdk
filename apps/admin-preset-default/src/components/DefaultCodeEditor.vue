<template>
  <PdkTextArea
    v-model.trim="model"
    v-test="AdminComponent.CodeEditor"
    :element="element" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {type ElementInstance} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);
</script>
