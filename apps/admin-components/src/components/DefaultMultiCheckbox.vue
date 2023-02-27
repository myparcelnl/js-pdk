<template>
  <PdkCheckboxInput
    v-for="(option, index) in element.props.options ?? []"
    :key="`${option.value}_${index}`"
    v-model="model"
    :element="element"
    :disabled="option.disabled || element.isDisabled || element.isSuspended"
    :label="option.label"
    :value="option.value" />
</template>

<script lang="ts" setup>
import {ElementInstance} from '@myparcel-pdk/frontend-core/src';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | boolean; element: ElementInstance<{options?: SelectOption[]}>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | boolean) => void>();

const model = useVModel(props, undefined, emit);
</script>
