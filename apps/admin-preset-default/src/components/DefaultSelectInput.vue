<template>
  <select
    :id="id"
    v-model="model"
    :disabled="options.length === 1 || element.isDisabled || element.isSuspended">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts" setup>
/**
 * A select box. Renders a list of options which each have their own value.
 */

import {ElementInstance, OptionsProp, useSelectInputContext} from '@myparcel-pdk/frontend-core/src';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{element: ElementInstance<OptionsProp>; modelValue: string | number}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const {options, id, model} = useSelectInputContext(props, emit);
</script>
