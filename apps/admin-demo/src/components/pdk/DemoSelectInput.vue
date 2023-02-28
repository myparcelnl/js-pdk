<template>
  <select
    :id="id"
    v-model="model"
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
import {ElementInstance, generateFieldId, useSelectInputContext} from '@myparcel-pdk/frontend-core/src';
import {SelectOption} from '@myparcel-pdk/common/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | number; element: ElementInstance<{options?: SelectOption[]}>}>();
const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);

const {options} = useSelectInputContext(model, props.element.props?.options ?? []);
</script>
