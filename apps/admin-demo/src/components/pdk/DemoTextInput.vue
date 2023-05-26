<template>
  <input
    :id="id"
    v-model.trim="model"
    :disabled="element.isDisabled || element.isSuspended"
    class="border px-3 py-2 rounded" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {type ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-admin-core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: number | string; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
