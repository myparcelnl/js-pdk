<template>
  <PdkTextInput
    v-model="model"
    :element="element"
    type="time" />
</template>

<script lang="ts" setup>
import {useElement} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps({modelValue: {type: String, default: null}});
const emit = defineEmits(['update:modelValue']);

const model = useVModel(props, undefined, emit);

const element = useElement();
</script>
