<template>
  <input
    :id="id"
    v-model.trim="model"
    v-test="AdminComponent.TextInput"
    :name="id"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {type ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-admin-core';
import {AdminComponent} from '@myparcel-pdk/common';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
