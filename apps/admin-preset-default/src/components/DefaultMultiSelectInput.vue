<template>
  <PdkSelectInput
    v-model="model"
    multiple
    :element="element">
  </PdkSelectInput>
</template>

<script lang="ts" setup>
/**
 * A multi-select box. Renders a list of options which each have their own value. Allows multiple options to be selected.
 */

import {ElementInstance, OptionsProp, useSelectInputContext} from '@myparcel-pdk/frontend-admin-core/src';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{element: ElementInstance<OptionsProp>; modelValue: string | number}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const {model} = useSelectInputContext(props, emit);
</script>
