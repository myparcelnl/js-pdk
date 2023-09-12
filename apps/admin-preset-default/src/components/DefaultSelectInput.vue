<template>
  <select
    :id="id"
    v-model="model"
    v-test="[AdminComponent.SelectInput, element]"
    :name="id"
    :disabled="options.length === 1 || element.isDisabled || element.isSuspended">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script generic="T extends SelectInputModelValue" lang="ts" setup>
/**
 * A select box. Renders a list of options which each have their own value.
 */

import {
  AdminComponent,
  type SelectInputEmits,
  type SelectInputModelValue,
  type SelectInputProps,
  useSelectInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<SelectInputProps<T>>();
const emit = defineEmits<SelectInputEmits<T>>();

const {options, id, model} = useSelectInputContext(props, emit);
</script>
