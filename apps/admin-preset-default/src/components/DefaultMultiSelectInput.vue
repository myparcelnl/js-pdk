<template>
  <PdkSelectInput
    v-model="model"
    v-test="AdminComponent.MultiSelectInput"
    :element="element"
    multiple />
</template>

<script generic="T extends MultiSelectInputModelValue" lang="ts" setup>
import {
  AdminComponent,
  type MultiSelectInputEmits,
  type MultiSelectInputModelValue,
  type MultiSelectInputProps,
  useMultiSelectInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<MultiSelectInputProps<T>>();
const emit = defineEmits<MultiSelectInputEmits<T>>();

const {model} = useMultiSelectInputContext(props, emit);
</script>
