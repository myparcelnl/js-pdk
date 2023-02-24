<template>
  <input
    :id="id"
    v-model.trim="model"
    :disabled="element.isDisabled || element.isSuspended"
    class="form-control" />
</template>

<script setup lang="ts">
import {generateFieldId, useElement} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number | null}>();

const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
const id = generateFieldId();
</script>
