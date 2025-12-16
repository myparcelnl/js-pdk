<template>
  <PdkNumberInput
    v-model.number="model"
    v-test="AdminComponent.NumberInput"
    :element="element"
    :step="0.01" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type CurrencyInputEmits, type CurrencyInputProps} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<CurrencyInputProps>();
const emit = defineEmits<CurrencyInputEmits>();

const model = useVModel(props, undefined, emit);
</script>
