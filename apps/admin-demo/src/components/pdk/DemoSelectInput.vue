<template>
  <select
    :id="id"
    v-model="model"
    :name="id"
    :disabled="options.length === 1 || element.isDisabled || element.isSuspended"
    class="border flex-grow px-2 py-1 rounded">
    <option
      v-for="(item, index) in options"
      :key="index"
      :disabled="item.disabled"
      :value="item.value"
      v-text="item.label" />
  </select>
</template>

<script lang="ts" setup>
import {type ElementInstance, type OptionsProp, useSelectInputContext} from '@myparcel-pdk/frontend-admin-core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{element: ElementInstance<OptionsProp>; modelValue: string | number}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | number) => void>();

const {id, model, options} = useSelectInputContext(props, emit);
</script>
