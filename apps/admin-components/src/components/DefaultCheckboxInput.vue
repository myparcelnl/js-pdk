<template>
  <label>
    {{ element.label }}
    <input
      :id="id"
      v-model="model"
      :disabled="element.isDisabled || element.isSuspended"
      :value="element.props.value"
      type="checkbox" />
    <i />
  </label>
</template>

<script lang="ts" setup>
import {ElementInstance, generateFieldId} from '@myparcel-pdk/frontend-core/src';
import {useVModel} from '@vueuse/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string | boolean; element: ElementInstance}>();
const emit = defineEmits<(e: 'update:modelValue', value: string | boolean) => void>();

const model = useVModel(props, undefined, emit);

const id = generateFieldId(props.element);
</script>
