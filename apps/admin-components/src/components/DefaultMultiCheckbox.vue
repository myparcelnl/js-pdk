<template>
  <PdkCheckboxInput
    v-for="(option, index) in element.props?.options ?? []"
    :key="`${option.value}_${index}`"
    v-model="model"
    :disabled="option.disabled || element.isDisabled || element.isSuspended"
    :label="option.label"
    :value="option.value" />
</template>

<script lang="ts" setup>
import {useElement} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | boolean}>();
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
</script>
