<template>
  <PdkNumberInput
    :id="id"
    v-model.number="model"
    :disabled="element.isDisabled || element.isSuspended"
    :min="0"
    :step="0.01" />
</template>

<script lang="ts" setup>
import {generateFieldId, useElement} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps({modelValue: {type: [String, Number], default: null}});
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
const id = generateFieldId();
</script>
