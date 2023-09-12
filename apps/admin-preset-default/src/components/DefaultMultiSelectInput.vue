<template>
  <PdkSelectInput
    v-model="model"
    v-test="[AdminComponent.MultiSelectInput, element]"
    :element="element"
    multiple />
</template>

<script generic="T extends MultiSelectInputModelValue" lang="ts" setup>
/**
 * A multi-select box. Renders a list of options which each have their own value. Allows multiple options to be selected.
 */
import {
  AdminComponent,
  type MultiSelectInputEmits,
  type MultiSelectInputModelValue,
  type MultiSelectInputProps,
  useSelectInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<MultiSelectInputProps<T>>();
const emit = defineEmits<MultiSelectInputEmits<T>>();

// @ts-expect-error Errors on emit, types need to be fixed
const {model} = useSelectInputContext(props, emit, true);
</script>
