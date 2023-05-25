<template>
  <select
    :id="id"
    v-model="model"
    :class="{
      disabled: options.length === 1 || element.isDisabled || element.isSuspended,
    }"
    class="custom-select form-control">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts" setup>
import {ElementInstance, OptionsProp, useSelectInputContext} from '@myparcel-pdk/frontend-admin-core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{element: ElementInstance<OptionsProp>; modelValue: string | number}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const {id, model, options} = useSelectInputContext(props, emit);
</script>
