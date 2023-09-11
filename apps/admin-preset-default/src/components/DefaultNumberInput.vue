<template>
  <PdkTextInput
    v-model.number="model"
    v-test="[AdminComponent.NumberInput, element]"
    :element="element"
    type="number" />
</template>

<script generic="" lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type NumberInputEmits, type NumberInputProps} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<NumberInputProps>();
const emit = defineEmits<NumberInputEmits>();

const model = useVModel(props, undefined, emit);
</script>
