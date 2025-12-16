<template>
  <PdkTextInput
    v-model="model"
    v-test="AdminComponent.TimeInput"
    :element="element"
    type="time" />
</template>

<script lang="ts" setup>
import {useVModel} from '@vueuse/core';
import {AdminComponent, type TimeInputEmits, type TimeInputProps} from '@myparcel-dev/pdk-admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<TimeInputProps>();
const emit = defineEmits<TimeInputEmits>();

const model = useVModel(props, undefined, emit);
</script>
