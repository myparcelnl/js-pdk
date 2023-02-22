<template>
  <input
    :id="id"
    v-model="model"
    :disabled="element.isDisabled || element.isSuspended"
    class="border px-3 py-2 rounded" />
</template>

<script setup lang="ts">
import {generateFieldId} from '@myparcel-pdk/frontend-core/src';
import {useElement} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps({modelValue: {type: String, default: null}});
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const id = generateFieldId();
const element = useElement();
</script>
