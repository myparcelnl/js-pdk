<template>
  <select
    :id="id"
    v-model="model"
    :name="id"
    :class="{
      disabled: options.length === 1 || element.isDisabled || element.isSuspended,
    }"
    :disabled="options.length === 1 || element.isDisabled || element.isSuspended"
    class="custom-select form-control">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script generic="T extends SelectInputModelValue" lang="ts" setup>
import {
  type SelectInputEmits,
  type SelectInputModelValue,
  type SelectInputProps,
  useSelectInputContext,
} from '@myparcel-pdk/admin';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<SelectInputProps<T>>();
const emit = defineEmits<SelectInputEmits<T>>();

const {id, model, options} = useSelectInputContext(props, emit);
</script>
