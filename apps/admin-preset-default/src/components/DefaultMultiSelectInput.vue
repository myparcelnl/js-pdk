<template>
  <PdkSelectInput
    v-model="model"
    v-test="AdminComponent.MultiSelectInput"
    :element="element"
    multiple />
</template>

<script generic="T extends (string | number)[]" lang="ts" setup>
/**
 * A multi-select box. Renders a list of options which each have their own value. Allows multiple options to be selected.
 */
import {AdminComponent, type PdkElementEmits, type SelectInputProps, useSelectInputContext} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<SelectInputProps<T>>();
const emit = defineEmits<PdkElementEmits<T>>();

// @ts-expect-error Errors on emit, types need to be fixed
const {model} = useSelectInputContext(props, emit, true);
</script>
